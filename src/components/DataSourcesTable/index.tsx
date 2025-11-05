import React from 'react';

type DataSourceItem = {
    title: string;
    topic?: string;
    nuget?: string;
    maven?: string;
    npm?: string;
};

const DataSources: DataSourceItem[] = [
    { title: "Amazon Athena", topic: "../adding-data-sources/amazon-athena", nuget: "Reveal.Sdk.Data.Amazon.Athena" },
    { title: "Amazon Redshift", topic: "", nuget: "Reveal.Sdk.Data.Amazon.Redshift" },
    { title: "Amazon S3", topic: "../adding-data-sources/amazon-s3", nuget: "Reveal.Sdk.Data.Amazon.S3" },
    // { title: "Box", topic: "", nuget: "Reveal.Sdk.Data.Box" }, do not advertise
    { title: "CSV (Comma Separated Values)", topic: "../adding-data-sources/csv" },
    // { title: "Dropbox", topic: "", nuget: "Reveal.Sdk.Data.Dropbox" }, do not advertise
    { title: "Databricks", topic: "../adding-data-sources/databricks", nuget: "Reveal.Sdk.Data.Databricks" },
    { title: "Elasticsearch", topic: "../adding-data-sources/elasticsearch", nuget: "Reveal.Sdk.Data.Elasticsearch" },
    // { title: "Google Analytics 4", topic: "", nuget: "Reveal.Sdk.Data.Google.Analytics4" }, do not advertise
    { title: "Google BigQuery", topic: "../adding-data-sources/google-big-query", nuget: "Reveal.Sdk.Data.Google.BigQuery" },
    // { title: "Google Drive", topic: "../adding-data-sources/google-drive", nuget: "Reveal.Sdk.Data.Google.Drive" }, do not advertise
    { title: "Google Sheets", topic: "../adding-data-sources/google-sheets", nuget: "Reveal.Sdk.Data.Google.Drive" },
    // { title: "Hubspot", topic: "", nuget: "Reveal.Sdk.Data.HubSpot" }, do not advertise
    { title: "In-Memory Data", topic: "../adding-data-sources/in-memory-data" },
    { title: "JSON", topic: "../adding-data-sources/json" },
    // { title: "Marketo", topic: "", nuget: "Reveal.Sdk.Data.Marketo" }, do not advertise
    { title: "Microsoft Analysis Services", topic: "", nuget: "Reveal.Sdk.Data.Microsoft.AnalysisServices" },
    { title: "Microsoft Azure Analysis Services", topic: "", nuget: "Reveal.Sdk.Data.Microsoft.AnalysisServices" },
    { title: "Microsoft Azure SQL Database", topic: "", nuget: "Reveal.Sdk.Data.Microsoft.SqlServer" },
    { title: "Microsoft Azure Synapse Analytics", topic: "", nuget: "Reveal.Sdk.Data.Microsoft.SynapseAnalytics" },
    // { title: "Microsoft Dynamics CRM", topic: "", nuget: "Reveal.Sdk.Data.Microsoft.Dynamics" }, do not advertise
    { title: "Microsoft Excel", topic: "../adding-data-sources/excel-file" },
    // { title: "Microsoft OneDrive", topic: "", nuget: "Reveal.Sdk.Data.Microsoft.OneDrive" }, do not advertise
    // { title: "Microsoft Reporting Services (SSRS)", topic: "", nuget: "Reveal.Sdk.Data.Microsoft.ReportingServices" }, do not advertise
    // { title: "Microsoft SharePoint", topic: "", nuget: "Reveal.Sdk.Data.Microsoft.SharePoint" }, do not advertise
    { title: "Microsoft SQL Server", topic: "../adding-data-sources/ms-sql-server", nuget: "Reveal.Sdk.Data.Microsoft.SqlServer" },
    { title: "MongoDB", topic: "../adding-data-sources/mongodb", nuget: "Reveal.Sdk.Data.MongoDb"},
    { title: "MySQL", topic: "../adding-data-sources/mysql", nuget: "Reveal.Sdk.Data.MySql" },
    { title: "OData Feed", topic: "" },
    { title: "Oracle", topic: "../adding-data-sources/oracle", nuget: "Reveal.Sdk.Data.Oracle" },
    { title: "PostgreSQL", topic: "../adding-data-sources/postgres", nuget: "Reveal.Sdk.Data.PostgreSQL" },
    // { title: "Quickbooks", topic: "", nuget: "Reveal.Sdk.Data.Quickbooks" }, do not advertise
    { title: "REST", topic: "../adding-data-sources/rest" },
    { title: "Snowflake", topic: "../adding-data-sources/snowflake", nuget: "Reveal.Sdk.Data.Snowflake" },
    // { title: "Sybase", topic: "", nuget: "Reveal.Sdk.Data.Sybase" }, do not advertise
    { title: "TSV (Tab Separated Values)", topic: "" },
]

function createHyperLink({ title, topic }: DataSourceItem) {
    if (topic) return ( <a href={topic}>{title}</a>);        
    return (<span>{title}</span>);
}

function createNugetLink({ title, nuget }: DataSourceItem) {
    if (!nuget) return (<span>Included in SDK</span>);
    return (
        <a href={"https://www.nuget.org/packages/" + nuget} target="_blank" rel="noopener noreferrer">
            <img loading="lazy" src={`https://img.shields.io/nuget/v/${nuget}`} alt={`NuGet Badge for ${title}`} />
        </a>
    );
}

function createMavenLink({ title, maven }: DataSourceItem) {
    if (!maven) return (<span>Included in SDK</span>);
    return (
        <a href={"https://www.nuget.org/packages/" + maven} target="_blank" rel="noopener noreferrer">
            MAVEN BADGE
        </a>
    );
}

function createNpmLink({ title, npm }: DataSourceItem) {
    if (!npm) return (<span>Included in SDK</span>);
    return (
        <a href={"https://www.nuget.org/packages/" + npm} target="_blank" rel="noopener noreferrer">
            <img loading="lazy" src={`https://img.shields.io/npm/v/${npm}`} alt={`NuGet Badge for ${title}`} />
        </a>
    );
}

export default function DataSourcesTable({ isWpf = false }: { isWpf?: boolean }): JSX.Element {
    return (
        <table>
            <thead>
                <tr>
                    <th>Data Source</th>
                    {!isWpf ? (
                        <>
                            <th>ASP.NET</th>
                            <th>JAVA</th>
                            <th>Node.js</th>
                        </>
                    ) : (
                        <th>Package</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {DataSources.map((props, idx) => (
                    <tr key={idx}>
                        <td>
                            {isWpf ? (
                                <span>{props.title}</span>
                            ) : (
                                createHyperLink(props)
                            )}                            
                        </td>
                        {!isWpf ? (
                            <>
                                <td>{createNugetLink(props)}</td>
                                <td>{createMavenLink(props)}</td>
                                <td>{createNpmLink(props)}</td>
                            </>
                        ) : (
                            <td>{createNugetLink(props)}</td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}