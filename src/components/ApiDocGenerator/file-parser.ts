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
    defaultValue: string | null;
}

export interface Method {
    name: string;
    arguments: Param[];
    description: string;
}

export interface Param {
    name: string;
    description: string;
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

const parseProperty = (node: t.ClassProperty) => {

    if (!t.isIdentifier(node.key)) {
        return null;
    }

    // Check if the property has the @property decorator
    if (!isProperty(node.decorators)) {
        return null;
    }

    // Extract type
    const type = extractTypeAnnotation(node.typeAnnotation);

    // Extract JSDoc description
    const jsDocComments = (node.leadingComments || []).filter(comment => comment.type === 'CommentBlock');
    const description = jsDocComments.map(comment => getJsDocDescription(comment.value)).join('\n').trim();

    // Extract default value
    const defaultValue = node.value ? generate(node.value).code : null;

    return {
        name: node.key.name,
        type: type,
        description: description,
        defaultValue: defaultValue,
    };
}

const isProperty = (decorators: t.Decorator[] | undefined): boolean => {
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
    return isPublic && !isOverride;
};

const getJsDocDescription = (comment: string): string => {
    const lines = comment
        .replace(/^\/\*\*/, '') // Remove leading /**
        .replace(/\*\/$/, '')   // Remove trailing */
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, '')); // Remove leading * and optional whitespace

    const descriptionLines: string[] = [];
    for (const line of lines) {
        if (line.trim().startsWith('@')) {
            break; // Stop processing when encountering the first @ symbol
        }
        if (line.trim() !== '') {
            descriptionLines.push(line);
        }
    }

    return descriptionLines.join(' ').trim();
};

const getParamsFromJsDoc = (comment: string): Param[] => {
    return comment
        .replace(/^\/\*\*/, '') // Remove leading /**
        .replace(/\*\/$/, '')   // Remove trailing */
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, '')) // Remove leading * and optional whitespace
        .map(line => line.match(/@param\s+(\w+)\s+(.*)/))
        .filter(match => match !== null)
        .map(match => {
            if (match) {
                const [, name, description] = match;
                return { name, description };
            }
            return null;
        })
        .filter((param): param is Param => param !== null); // Type guard to filter out nulls
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
        }
    }
    return '';
}

const parseMethod = (node: t.ClassMethod) => {
    if (!t.isIdentifier(node.key)) {
        return null;
    }

    // Check if the method is public and not an override
    if (!isPublicMethod(node)) {
        return null;
    }

    // Extract JSDoc description and parameters
    const jsDocComments = (node.leadingComments || []).filter(comment => comment.type === 'CommentBlock');
    const description = jsDocComments.map(comment => getJsDocDescription(comment.value)).join('\n').trim();
    const params = jsDocComments.flatMap(comment => getParamsFromJsDoc(comment.value));

    return {
        name: node.key.name,
        arguments: params,
        description: description,
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