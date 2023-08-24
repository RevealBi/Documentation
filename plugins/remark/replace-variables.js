const visit = require('unist-util-visit');

const plugin = (options) => {

    const transformer = async (ast) => {
        visit(ast, ["text", "code", "link"], (node) => {
            if (node.type === "link") {
                node.url = getValue(node.url, options);
            } else {
                node.value = getValue(node.value, options);
            }            
        });
    };
    return transformer;
};

const pattern = /\[var:([^[\]]+)\]/g;
const getValue = (value, options) => {
    return value.replace(pattern, (match, variableName) => {
        const variable = options.variables.find(varObj => varObj.name === variableName);
        return variable ? variable.value : match;
    });
};

module.exports = plugin;