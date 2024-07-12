import { useEffect, useState } from "react";
import { parseComponentFile, Component, Property, Method } from "./file-parser";


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
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>                          
                                <th>Description</th>
                                <th>Type</th>      
                                <th>Default</th>
                            </tr>
                        </thead>
                        <tbody>
                            {component.properties.map((property, index) => (
                                <tr key={index}>
                                    <td>{property.name}</td>
                                    <td>{property.description}</td>
                                    <td><code>{property.type}</code></td>
                                    <td><code>{property.defaultValue || 'null'}</code></td>
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
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Arguments</th>                                
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