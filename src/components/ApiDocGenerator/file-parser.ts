import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import generate from '@babel/generator';

export interface Component {
    name: string;
    properties: Property[];
    methods: Method[];
}

export interface Property {
    name: string;
    type: string;
    description: string;
    example?: string;
}

export interface Method {
    name: string;
    arguments: Param[];
    description: string;
    returns?: string;
}

export interface Param {
    name: string;
    description: string;
}

export interface JsDoc {
    description: string;
    example?: string;
    params?: Param[];
    returns?: string;
}

const fetchFileContents = async (path: string) => {
    try {
        const response = await fetch(`https://api.github.com/repos/RevealBi/revealbi-ui/contents/packages/ui/src/components/${path}`);
        const data = await response.json();
        if (data && data.content) {
            return atob(data.content);
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

const hasPropertyDecorator = (decorators: t.Decorator[] | undefined): boolean => {
    if (!decorators) return false;
    return decorators.some(decorator => {
        if (t.isCallExpression(decorator.expression) && t.isIdentifier(decorator.expression.callee)) {
            return decorator.expression.callee.name === 'property';
        }
        return false;
    });
};

const isPublicMethod = (node: t.ClassMethod): boolean => {
    const isPublic = !node.accessibility || node.accessibility === 'public';
    const isOverride = node.decorators?.some(decorator =>
        t.isCallExpression(decorator.expression) &&
        t.isIdentifier(decorator.expression.callee) &&
        decorator.expression.callee.name === 'override'
    );
    const isGetter = node.kind === 'get'; //ignore property getter methods
    return isPublic && !isOverride && !isGetter;
};

const parseJsDocs = (comment: string): JsDoc => {
    const lines = comment
        .replace(/^\/\*\*/, '') // Remove leading /**
        .replace(/\*\/$/, '')   // Remove trailing */
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, '')); // Remove leading * and optional whitespace

    const descriptionLines: string[] = [];
    const params: Param[] = [];
    let returns: string | null = null;
    let exampleLines: string[] = [];
    let inExampleBlock = false;

    for (const line of lines) {
        if (line.trim().startsWith('@example')) {
            inExampleBlock = true;
            continue;
        }

        if (inExampleBlock) {
            if (line.trim().startsWith('```')) {
                if (exampleLines.length > 0) {
                    inExampleBlock = !inExampleBlock;
                    continue;
                } else {
                    // Start of code block, skip the line with ```
                    continue;
                }
            }
            exampleLines.push(line);
        } else if (line.trim().startsWith('@param')) {
            const match = line.match(/@param\s+(\w+)\s+-?\s*(.*)/);
            if (match) {
                const [, name, description] = match;
                params.push({ name, description });
            }
        } else if (line.trim().startsWith('@returns')) {
            const match = line.match(/@returns?\s+-?\s*(.*)/);
            if (match) {
                returns = match[1].trim();
            }
        } else if (line.trim().startsWith('@')) {
            // Ignore other tags
            continue;
        } else {
            if (line.trim() !== '') {
                descriptionLines.push(line);
            }
        }
    }

    return {
        description: descriptionLines.join(' ').trim(),
        params: params,
        returns: returns,
        example: exampleLines.length > 0 ? exampleLines.join('\n').trim() : null,
    };
};

function extractTypeAnnotation(typeAnnotation: t.TypeAnnotation | t.TSTypeAnnotation | t.Noop | null | undefined): string {
    if (t.isTSTypeAnnotation(typeAnnotation)) {
        const type = typeAnnotation.typeAnnotation;
        if (t.isTSTypeReference(type) && t.isIdentifier(type.typeName)) {
            return type.typeName.name;
        } else if (t.isTSStringKeyword(type)) {
            return 'string';
        } else if (t.isTSNumberKeyword(type)) {
            return 'number';
        } else if (t.isTSBooleanKeyword(type)) {
            return 'boolean';
        } else if (t.isTSAnyKeyword(type)) {
            return 'any';
        } else if (t.isTSFunctionType(type)) {
            return generate(type).code; // Generate the function type signature
        } else if (t.isTSUnionType(type)) {
            return type.types.map(subType => generate(subType).code).join(' | '); // Handle union types
        }
    }
    return '';
}

const parseProperty = (node: t.ClassProperty): Property => {

    if (!t.isIdentifier(node.key)) {
        return null;
    }

    // Check if the property has the @property decorator
    if (!hasPropertyDecorator(node.decorators)) {
        return null;
    }

    // Extract type
    const type = extractTypeAnnotation(node.typeAnnotation);

    // Extract JSDocs
    const jsDocComments = (node.leadingComments || []).filter(comment => comment.type === 'CommentBlock');
    if (jsDocComments.length === 0) {
        return null;
    }
    const jsDoc = parseJsDocs(jsDocComments[0].value);

    return {
        name: node.key.name,
        type: type,
        description: jsDoc.description,
        example: jsDoc.example,
    };
}

const parseMethod = (node: t.ClassMethod) => {
    if (!t.isIdentifier(node.key)) {
        return null;
    }

    // Check if the method is public and not an override
    if (!isPublicMethod(node)) {
        return null;
    }

    // Extract JSDocs
    const jsDocComments = (node.leadingComments || []).filter(comment => comment.type === 'CommentBlock');
    if (jsDocComments.length === 0) {
        return null;
    }
    const jsDoc = parseJsDocs(jsDocComments[0].value);

    return {
        name: node.key.name,
        arguments: jsDoc.params,
        description: jsDoc.description,
        returns: jsDoc.returns,
    };
}

export const parseComponentFile = async (path: string) => {
    const contents = await fetchFileContents(path);
    if (!contents) {
        return null;
    }

    const ast = parser.parse(contents, {
        sourceType: 'module',
        plugins: ['decorators', 'typescript'],
    });

    const component: Component = {
        name: '',
        properties: [],
        methods: [],
    };

    traverse(ast, {
        ClassDeclaration(path) {
            component.name = path.node.id.name;
            path.node.body.body.forEach((member: t.Node) => {
                if (t.isClassMethod(member)) {
                    const method = parseMethod(member);
                    if (method) {
                        component.methods.push(method);
                    }
                } else if (t.isClassProperty(member)) {
                    const property = parseProperty(member);
                    if (property) {
                        component.properties.push(property);
                    }
                }
            });
        },
    });

    // Sort properties and methods alphabetically by name
    component.properties.sort((a, b) => a.name.localeCompare(b.name));
    component.methods.sort((a, b) => a.name.localeCompare(b.name));

    return component;
}