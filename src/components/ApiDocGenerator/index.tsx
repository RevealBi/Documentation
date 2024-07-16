import { useEffect, useState } from "react";
import { parseComponentFile, Component, Property, Method } from "./file-parser";
import CodeBlock from '@theme/CodeBlock';
import './index.css';


const ApiDocGenerator = ({ path }) => {

    const [component, setComponent] = useState<Component | null>(null);

    useEffect(() => {
        parseComponentFile(path).then((component) => {
            setComponent(component);
        });
    }, [path]);

    return (
        <>
            <h2 id="properties">Properties<a className="hash-link" aria-label="Direct link to heading" title="Direct link to heading" href="#properties"></a></h2>
            {component && component.properties.length > 0 ? (
                <div className="api-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th style={{minWidth: "500px"}}>Description</th>
                                <th>Type</th>
                                <th>Example</th>
                            </tr>
                        </thead>

                        <tbody>
                            {component.properties.map((property, index) => (
                                <tr key={index}>
                                    <td>{property.name}</td>
                                    <td>{property.description}</td>
                                    <td><code>{property.type}</code></td>
                                    <td>{property.example && <CodeBlock language="typescript">{property.example}</CodeBlock>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No properties available.</p>
            )}

            <h2 id="methods">Methods<a className="hash-link" aria-label="Direct link to heading" title="Direct link to heading" href="#methods"></a></h2>
            {component && component.methods.length > 0 ? (
                <div className="api-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th style={{minWidth: "500px"}}>Description</th>
                                <th style={{minWidth: "500px"}}>Arguments</th>
                                <th style={{minWidth: "500px"}}>Returns</th>
                            </tr>
                        </thead>
                        <tbody>
                            {component.methods.map((method, index) => (
                                <tr key={index}>
                                    <td>{method.name}</td>
                                    <td>{method.description}</td>
                                    <td>
                                        {method.arguments.length > 0 ? (
                                            method.arguments.map((param, paramIndex) => (
                                                <span key={paramIndex}><code>{param.name}</code>: {param.description}</span>
                                            ))
                                        ) : (
                                            <code>none</code>
                                        )}
                                    </td>
                                    <td>{method.returns}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No methods available.</p>
            )}
        </>
    );
}

ApiDocGenerator.toc = () => {
    return [
        { id: "properties", value: "Properties", level: 2 },
        { id: "methods", value: "Methods", level: 2 }
    ];
};

export default ApiDocGenerator;