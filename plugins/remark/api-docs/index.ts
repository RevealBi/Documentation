import { visit } from 'unist-util-visit';
import { GitHubApiOptions, Method, parseComponentFile, Property } from './file-parser';

const plugin = (options) => {
    const transformer = async (ast) => {
        const promises = [];

        visit(ast, "text", (node, index, parent) => {
            const match = node.value.match(/::github-api-docs\(([\s\S]+?)\)/);
            if (match) {
                const options: GitHubApiOptions = parseOptions(match[1]);
                promises.push(generateApiDocs(options).then((nodes) => {
                    if (parent.type === 'paragraph') {
                        parent.type = 'root';
                        parent.children = nodes;
                    } else {
                        parent.children.splice(index, 1, ...nodes);
                    }
                }));
            }
        });

        await Promise.all(promises);
    };

    return transformer;
};

const parseOptions = (configString): GitHubApiOptions => {
    const options: GitHubApiOptions = { owner: '', repo: '', path: '' };

    configString.split(',').forEach((pair) => {
        const [key, value] = pair.split(':').map((str) => str.trim());
        if (key && value) {
            options[key] = value.replace(/['"]/g, '');
        }
    });

    return options;
}

const generateApiDocs = async (options: GitHubApiOptions) => {
    const nodes = [];
    const component = await parseComponentFile(options);

    const properties = generateProperties(component?.properties);
    nodes.push(...properties);

    const methods = generateMethods(component?.methods);
    nodes.push(...methods);

    const slots = generateSlots(component?.slots);
    nodes.push(...slots);

    const cssProperties = generateCssProperties(component?.cssProperties);
    nodes.push(...cssProperties);

    const parts = generateParts(component?.cssParts);
    nodes.push(...parts);

    return nodes;
}

const generateProperties = (properties: Property[]) => {
    if (!properties || properties.length === 0) return [];

    const nodes = [];

    // Heading for the Properties section
    nodes.push({
        type: "heading",
        depth: 2,
        children: [{ type: "text", value: "Properties" }]
    });

    properties.forEach((property) => {
        // Heading for the property name
        nodes.push({
            type: "heading",
            depth: 3,
            children: [{ type: "text", value: property.name }]
        });

        nodes.push({
            type: "paragraph",
            children: [
                { type: "text", value: "Type: " },
                { type: "inlineCode", value: property.type }
            ]
        });

        nodes.push({
            type: "paragraph",
            children: [{ type: "text", value: property.description }]
        });

        if (property.example) {
            nodes.push({
                type: "code",
                lang: "typescript",
                value: property.example
            });
        }
    });

    return nodes;
};

const generateMethods = (methods: Method[]) => {
    if (!methods || methods.length === 0) return [];

    const nodes = [];

    nodes.push({
        type: "heading",
        depth: 2,
        children: [{ type: "text", value: "Methods" }]
    });

    methods.forEach((method) => {
        nodes.push({
            type: "heading",
            depth: 3,
            children: [{ type: "text", value: method.name }]
        });

        nodes.push({
            type: "paragraph",
            children: [{ type: "text", value: method.description }]
        });

        nodes.push({
            type: "code",
            value: method.methodDefinition
        });

        if (method.parameters && method.parameters.length > 0) {
            nodes.push({
                type: "paragraph",
                children: [{ type: "text", value: "Parameters:" }]
            });

            // Table heading
            nodes.push({
                type: "table",
                children: [
                    {
                        type: "tableRow",
                        children: [
                            { type: "tableCell", children: [{ type: "text", value: "Name" }] },
                            { type: "tableCell", children: [{ type: "text", value: "Type" }] },
                            { type: "tableCell", children: [{ type: "text", value: "Description" }] }
                        ]
                    },
                    // Table rows for each argument (assuming `property.arguments` is an array of arguments)
                    ...method.parameters.map((param) => ({
                        type: "tableRow",
                        children: [
                            { type: "tableCell", children: [{ type: "text", value: param.name }] },
                            { type: "tableCell", children: [{ type: "text", value: param.type }] },
                            { type: "tableCell", children: [{ type: "text", value: param.description }] }
                        ]
                    }))
                ]
            });
        }

        if (method.returns) {
            nodes.push({
                type: "paragraph",
                children: [
                    { type: "text", value: "Returns: " },
                    { type: "inlineCode", value: method.returns.type },
                    ...(method.returns.description ? [
                        { type: "text", value: " - " },
                        { type: "text", value: method.returns.description }
                    ] : [])
                ]
            });
        }
    });

    return nodes;
}

const generateSlots = (slots: any[]) => {
    if (!slots || slots.length === 0) return [];

    const nodes = [];

    nodes.push({
        type: "heading",
        depth: 2,
        children: [{ type: "text", value: "Slots" }]
    });

    slots.forEach((slot) => {
        nodes.push({
            type: "heading",
            depth: 3,
            children: [{ type: "text", value: slot.name }]
        });

        nodes.push({
            type: "paragraph",
            children: [{ type: "text", value: slot.description }]
        });
    });

    return nodes;
}

const generateCssProperties = (cssProperties: any[]) => {
    if (!cssProperties || cssProperties.length === 0) return [];

    const nodes = [];

    nodes.push({
        type: "heading",
        depth: 2,
        children: [{ type: "text", value: "CSS Properties" }]
    });

    cssProperties.forEach((cssProperty) => {
        nodes.push({
            type: "heading",
            depth: 3,
            children: [{ type: "text", value: cssProperty.name }]
        });

        nodes.push({
            type: "paragraph",
            children: [{ type: "text", value: cssProperty.description }]
        });
    });

    return nodes;
}

const generateParts = (parts: any[]) => {
    if (!parts || parts.length === 0) return [];

    const nodes = [];

    nodes.push({
        type: "heading",
        depth: 2,
        children: [{ type: "text", value: "CSS Parts" }]
    });

    parts.forEach((part) => {
        nodes.push({
            type: "heading",
            depth: 3,
            children: [{ type: "text", value: part.name }]
        });

        nodes.push({
            type: "paragraph",
            children: [{ type: "text", value: part.description }]
        });
    });

    return nodes;
}

export default plugin;
