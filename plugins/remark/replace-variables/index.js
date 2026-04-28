import { visit } from 'unist-util-visit';
const pattern = /\[var:([^[\]]+)\]/g;
const versionFromPath = (filePath) => {
    if (!filePath)
        return 'current';
    const normalized = filePath.replace(/\\/g, '/');
    const match = normalized.match(/\/versioned_docs\/version-([^/]+)\//)
        ?? normalized.match(/\/docusaurus-plugin-content-docs\/version-([^/]+)\//);
    return match ? match[1] : 'current';
};
const getValue = (value, variables) => {
    return value.replace(pattern, (match, variableName) => {
        const variable = variables.find(v => v.name === variableName);
        return variable ? variable.value : match;
    });
};
const plugin = (options) => {
    return async (ast, file) => {
        const filePath = file?.path ?? file?.history?.[0] ?? '';
        const version = versionFromPath(filePath);
        const variables = options.variablesByVersion?.[version]
            ?? options.variablesByVersion?.current
            ?? options.variables
            ?? [];
        visit(ast, ['text', 'code', 'link'], (node) => {
            if (node.type === 'link') {
                node.url = getValue(node.url, variables);
            }
            else {
                node.value = getValue(node.value, variables);
            }
        });
    };
};
export default plugin;
