import React from 'react';
import { useDocsVersionFromPath } from '@site/src/utils/useDocsVersionFromPath';
import { dataSourcesCurrent, dataSourcesV1 } from './data-sources';
const DATA_SOURCES_BY_VERSION = {
    current: dataSourcesCurrent,
    '1.8.4': dataSourcesV1,
};
function createHyperLink({ title, topic }) {
    if (topic)
        return (<a href={topic}>{title}</a>);
    return (<span>{title}</span>);
}
function createNugetLink({ title, nuget }) {
    if (!nuget)
        return (<span>Included in SDK</span>);
    return (<a href={"https://www.nuget.org/packages/" + nuget} target="_blank" rel="noopener noreferrer">
            <img loading="lazy" src={`https://img.shields.io/nuget/v/${nuget}`} alt={`NuGet Badge for ${title}`}/>
        </a>);
}
function createMavenLink({ title, maven }) {
    if (maven === "")
        return (<span>Not Supported</span>);
    if (!maven)
        return (<span>Included in SDK</span>);
    return (<a href={"https://www.nuget.org/packages/" + maven} target="_blank" rel="noopener noreferrer">
            MAVEN BADGE
        </a>);
}
function createNpmLink({ title, npm }) {
    if (!npm)
        return (<span>Included in SDK</span>);
    return (<a href={"https://www.nuget.org/packages/" + npm} target="_blank" rel="noopener noreferrer">
            <img loading="lazy" src={`https://img.shields.io/npm/v/${npm}`} alt={`NuGet Badge for ${title}`}/>
        </a>);
}
export default function DataSourcesTable({ isWpf = false }) {
    const version = useDocsVersionFromPath();
    const sources = DATA_SOURCES_BY_VERSION[version] ?? dataSourcesCurrent;
    return (<table>
            <thead>
                <tr>
                    <th>Data Source</th>
                    {!isWpf ? (<>
                            <th>ASP.NET</th>
                            <th>JAVA</th>
                            <th>Node.js</th>
                        </>) : (<th>Package</th>)}
                </tr>
            </thead>
            <tbody>
                {sources.map((props, idx) => (<tr key={idx}>
                        <td>
                            {isWpf ? (<span>{props.title}</span>) : (createHyperLink(props))}
                        </td>
                        {!isWpf ? (<>
                                <td>{createNugetLink(props)}</td>
                                <td>{createMavenLink(props)}</td>
                                <td>{createNpmLink(props)}</td>
                            </>) : (<td>{createNugetLink(props)}</td>)}
                    </tr>))}
            </tbody>
        </table>);
}
