import { useEffect, useState } from "react";
import { parseComponentFile, Component, Property, Method } from "./file-parser";


const ApiDocGenerator = ({ path }) => {

    const [apiDocs, setApiDocs] = useState<{ properties: Property[]; methods: Method[] } | null>(null);

    useEffect(() => {
        parseComponentFile(path).then((content) => {
            console.log(content);
        });        
    }, [path]);

    return (
        <>
            <h2 id="properties">Properties<a className="hash-link" aria-label="Direct link to heading" title="Direct link to heading" href="#properties"></a></h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

            <h2 id="methods">Methods<a className="hash-link" aria-label="Direct link to heading" title="Direct link to heading" href="#methods"></a></h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Arguments</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
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