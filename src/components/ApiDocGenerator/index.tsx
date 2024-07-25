import { useEffect, useState } from "react";
import { parseComponentFile, Component, Property, Method } from "./file-parser";
import CodeBlock from '@theme/CodeBlock';
import './index.css';
import { JsDocCssPart, JsDocCssProperty, JsDocSlot } from "./jsdoc-parser";

const TableSection = ({ id, title, columns, items, renderItem, noItemsMessage }) => (
    <>
        <h2 id={id}>{title}<a className="hash-link" aria-label="Direct link to heading" title="Direct link to heading" href={`#${id}`}></a></h2>
        {items && items.length > 0 ? (
            <div className="api-table-container">
                <table>
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} style={col.style}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => renderItem(item, index))}
                    </tbody>
                </table>
            </div>
        ) : (
            <p>{noItemsMessage}</p>
        )}
    </>
);

const ApiDocGenerator = ({ path }) => {
    const [component, setComponent] = useState<Component | null>(null);

    useEffect(() => {
        parseComponentFile(path).then((component) => {
            setComponent(component);
        });
    }, [path]);

    return (
        <>
            <TableSection
                id="slots"
                title="Slots"
                columns={[
                    { label: "Name", style: {} },
                    { label: "Description", style: { minWidth: "500px" } }
                ]}
                items={component?.slots || []}
                renderItem={(slot: JsDocSlot, index) => (
                    <tr key={index}>
                        <td>{slot.name}</td>
                        <td>{slot.description}</td>
                    </tr>
                )}
                noItemsMessage="No slots available."
            />

            <TableSection
                id="properties"
                title="Properties"
                columns={[
                    { label: "Name", style: {} },
                    { label: "Description", style: { minWidth: "500px" } },
                    { label: "Type", style: {} },
                    { label: "Example", style: {} }
                ]}
                items={component?.properties || []}
                renderItem={(property: Property, index) => (
                    <tr key={index}>
                        <td>{property.name}</td>
                        <td>{property.description}</td>
                        <td><pre style={{ background: "none", margin: 0 }}>{property.type}</pre></td>
                        <td>{property.example && <CodeBlock language="typescript">{property.example}</CodeBlock>}</td>
                    </tr>
                )}
                noItemsMessage="No properties available."
            />

            <TableSection
                id="methods"
                title="Methods"
                columns={[
                    { label: "Name", style: {} },
                    { label: "Description", style: { minWidth: "500px" } },
                    { label: "Arguments", style: { minWidth: "500px" } },
                    { label: "Returns", style: { minWidth: "500px" } }
                ]}
                items={component?.methods || []}
                renderItem={(method: Method, index) => (
                    <tr key={index}>
                        <td>{method.name}</td>
                        <td>{method.description}</td>
                        <td>
                            {method.arguments.length > 0 && (
                                method.arguments.map((param, paramIndex) => (
                                    <span key={paramIndex}><code>{param.name}</code>: {param.description}<br /></span>
                                ))
                            )}
                        </td>
                        <td>{method.returns}</td>
                    </tr>
                )}
                noItemsMessage="No methods available."
            />

            <TableSection
                id="cssProperties"
                title="CSS Properties"
                columns={[
                    { label: "Name", style: {} },
                    { label: "Description", style: { minWidth: "500px" } }
                ]}
                items={component?.cssProperties || []}
                renderItem={(cssProperty: JsDocCssProperty, index) => (
                    <tr key={index}>
                        <td>{cssProperty.name}</td>
                        <td>{cssProperty.description}</td>
                    </tr>
                )}
                noItemsMessage="No CSS properties available."
            />

            <TableSection
                id="parts"
                title="Parts"
                columns={[
                    { label: "Name", style: {} },
                    { label: "Description", style: { minWidth: "500px" } }
                ]}
                items={component?.cssParts || []}
                renderItem={(cssPart: JsDocCssPart, index) => (
                    <tr key={index}>
                        <td>{cssPart.name}</td>
                        <td>{cssPart.description}</td>
                    </tr>
                )}
                noItemsMessage="No parts available."
            />
        </>
    );
}

ApiDocGenerator.toc = () => {
    return [
        { id: "slots", value: "Slots", level: 2 },
        { id: "properties", value: "Properties", level: 2 },
        { id: "methods", value: "Methods", level: 2 },
        { id: "cssProperties", value: "CSS Properties", level: 2 },
        { id: "parts", value: "Parts", level: 2 },
    ];
};

export default ApiDocGenerator;