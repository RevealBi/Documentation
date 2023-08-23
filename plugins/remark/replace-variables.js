const visit = require('unist-util-visit');

const plugin = (options) => {

    const pattern = /\[var:([^[\]]+)\]/g;

    const transformer = async (ast) => {
        visit(ast, ['code'], (node) => {

            let value = node.value;

            value = value.replace(pattern, (match, variableName) => {
                const variable = options.variables.find(varObj => varObj.name === variableName);
                return variable ? variable.value : match;
            });

            node.value = value;
        });
    };
    return transformer;
};

module.exports = plugin;