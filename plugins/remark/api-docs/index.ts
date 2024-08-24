import { visit } from 'unist-util-visit';
import { parseComponentFile } from './file-parser';

const plugin = (options) => {
    const transformer = async (ast) => {
        const promises = [];

        visit(ast, "text", (node, index, parent) => {
            const match = node.value.match(/::github-api-docs\((.+?)\)/);
            if (match) {
                const options: any = parseOptions(match[1]);

                promises.push(generateApiDocs(options.path).then((nodes) => {
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

const parseOptions = (configString) => {
    const options = {};

    configString.split(',').forEach((pair) => {
        const [key, value] = pair.split('=').map((str) => str.trim());
        if (key && value) {
            options[key] = value;
        }
    });

    return options;
}

const generateApiDocs = async (path: string) => {
    const nodes = [];
    const component = await parseComponentFile(path);

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

const generateProperties = (properties) => {
    if (!properties) return [];

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
            children: [{ type: "text", value: property.description }]
        });

        // List containing description, type, and example
        const listItems = [
            {
                type: "listItem",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "strong",
                                children: [{ type: "text", value: "Type: " }]
                            },
                            { type: "inlineCode", value: property.type }
                        ]
                    }
                ]
            },
            property.example && {
                type: "listItem",
                children: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "strong",
                                children: [{ type: "text", value: "Example:" }]
                            }
                        ]
                    },
                    {
                        type: "code",
                        lang: "typescript",
                        value: property.example
                    }
                ]
            }
        ].filter(Boolean); // Remove any null items

        nodes.push({
            type: "list",
            ordered: false, // Unordered list
            children: listItems
        });
    });

    return nodes;
};

const generateMethods = (methods) => {
    if (!methods) return [];

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

        if (method.example) {
            nodes.push({
                type: "code",
                lang: "typescript",
                value: method.example
            });
        }
    });

    return nodes;
}

const generateSlots = (slots) => {
    if (!slots) return [];

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

const generateCssProperties = (cssProperties) => {
    if (!cssProperties) return [];

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

const generateParts = (parts) => {
    if (!parts) return [];

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
