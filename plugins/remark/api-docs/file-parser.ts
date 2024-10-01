import { parseJsDocs, JsDocParam, JsDoc, JsDocCssPart, JsDocCssProperty, JsDocSlot, JsDocReturn } from './jsdoc-parser';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import generate from '@babel/generator';

export interface Component {
    name: string;
    properties: Property[];
    methods: Method[];
    cssParts?: JsDocCssPart[];
    cssProperties?: JsDocCssProperty[];
    slots?: JsDocSlot[];
}

export interface Property {
    name: string;
    type: string;
    description: string;
    example?: string;
}

export interface Method {
    name: string;
    methodDefinition: string;
    parameters: JsDocParam[];
    description: string;
    returns?: JsDocReturn;
}

const fetchFileContents = async (path: string) => {
    try {
        //todo: need to change the path to support different repos.
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
    const isSetter = node.kind === 'set'; //ignore property setter methods
    return isPublic && !isOverride && !isGetter && !isSetter;
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

const parsePropertyDetails = (node: t.ClassProperty | t.ClassMethod, type: string): Property | null => {
    const name = t.isIdentifier(node.key) ? node.key.name : 'Not Found';   

    // Extract JSDocs
    const jsDocComments = (node.leadingComments || []).filter(comment => comment.type === 'CommentBlock');
    let jsDoc: JsDoc | null = null;
    if (jsDocComments.length > 0) {
        jsDoc = parseJsDocs(jsDocComments[0].value);
    }    

    return {
        name: name,
        type: type,
        description: jsDoc?.description || 'Description missing',
        example: jsDoc?.example,
    };
};

const parseProperty = (node: t.ClassProperty): Property | null => {

    // Check if the property has the @property decorator
    if (!hasPropertyDecorator(node.decorators)) {
        return null;
    }

    // Extract type
    const type = extractTypeAnnotation(node.typeAnnotation);

    return parsePropertyDetails(node, type);
}

const parseAccessorProperty = (node: t.ClassMethod): Property | null => {

    // Extract return type for getter or parameter type for setter
    let type = '';
    if (node.kind === 'get') {
        type = extractTypeAnnotation(node.returnType);
    } else if (node.kind === 'set' && node.params.length > 0) {
        type = extractTypeAnnotation((node.params[0] as t.Identifier).typeAnnotation);
    }

    return parsePropertyDetails(node, type);
};

const parseMethod = (node: t.ClassMethod): Method | null => {
    const name = t.isIdentifier(node.key) ? node.key.name : 'Not Found';

    // Check if the method is public and not an override
    if (!isPublicMethod(node)) {
        return null;
    }

    // Extract JSDocs
    const jsDocComments = (node.leadingComments || []).filter(comment => comment.type === 'CommentBlock');
    let jsDoc: JsDoc | null = null;
    if (jsDocComments.length > 0) {
        jsDoc = parseJsDocs(jsDocComments[0].value);
    }

    // Extract parameter definitions
    const parameters = node.params.map((param: t.Node) => {
        if (t.isIdentifier(param)) {
            // Check if the parameter is optional
            const paramName = param.optional ? `${param.name}?` : param.name;
            return `${paramName}: ${param.typeAnnotation ? extractTypeAnnotation(param.typeAnnotation) : 'any'}`;
        } else if (t.isAssignmentPattern(param) && t.isIdentifier(param.left)) {
            // Handle default values
            const paramName = param.left.optional ? `${param.left.name}?` : param.left.name;
            return `${paramName}: ${param.left.typeAnnotation ? extractTypeAnnotation(param.left.typeAnnotation) : 'any'} = ${generate(param.right).code}`;
        } else {
            return 'unknown';
        }
    });

    // Construct the method definition
    const methodDefinition = `${name}(${parameters.join(', ')})`;

    return {
        name: name,
        methodDefinition: methodDefinition,
        parameters: jsDoc?.params,
        description: jsDoc?.description || 'Description missing',
        returns: jsDoc?.returns,
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

    const propertyMap = new Map<string, Property>();

    traverse(ast, {
        ClassDeclaration(path) {
            component.name = path.node.id.name;

            // Extract JSDoc for the class itself
            let jsDocComments = (path.parentPath.node.leadingComments || []).filter(comment => comment.type === 'CommentBlock');
            if (jsDocComments.length > 0) {
                const classJsDoc = parseJsDocs(jsDocComments[0].value);
                component.cssParts = classJsDoc.cssParts || [];
                component.cssProperties = classJsDoc.cssProperties || [];
                component.slots = classJsDoc.slots || [];
            }

            path.node.body.body.forEach((member: t.Node) => {
                if (t.isClassMethod(member)) {
                    //lets see if we are dealing wiht getter/setter properties
                    if (member.kind === 'get' || member.kind === 'set') {
                        const property = parseAccessorProperty(member);
                        if (property) {
                            const existingProperty = propertyMap.get(property.name);
                            if (existingProperty) {
                                propertyMap.set(property.name, {
                                    ...existingProperty,
                                    type: property.type || existingProperty.type,
                                    description: property.description || existingProperty.description,
                                    example: property.example || existingProperty.example,
                                });
                            } else {
                                propertyMap.set(property.name, property);
                            }
                        }
                    } else {
                        const method = parseMethod(member);
                        if (method) {
                            component.methods.push(method);
                        }
                    }
                } else if (t.isClassProperty(member)) {
                    const property = parseProperty(member);
                    if (property) {
                        propertyMap.set(property.name, property);
                    }
                }
            });
        },
    });

    component.properties = Array.from(propertyMap.values());

    // Sort properties and methods alphabetically by name
    component.properties.sort((a, b) => a.name.localeCompare(b.name));
    component.methods.sort((a, b) => a.name.localeCompare(b.name));

    return component;
}