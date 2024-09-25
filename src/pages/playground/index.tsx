import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import MainStyles from '@docusaurus/theme-classic/lib/theme/DocRoot/Layout/Main/styles.module.css';
import DocRootStyles from '@docusaurus/theme-classic/lib/theme/DocRoot/Layout/styles.module.css';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';
import { ApiFeatures } from './_apiFeatures';
import PageSideBar from '@site/src/components/PageSideBar';

import CodeEditor from '@site/src/components/CodeEditor';

export default function Playground(): JSX.Element {

    const defaultCode = "//click on feature or type code directy into editor";
    const [srcDoc, setSrcDoc] = useState("");
    const [code, setCode] = useState(defaultCode);
    const editorRef = useRef(null);

    useEffect(() => {
        runCode(code);
    }, [code]);

    function onFeatureClick(item) {
        setCode(item.code);
    }

    function runCode(code) {

        const documentContents = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Reveal Sdk</title>
            </head>
            <body>  
        
            <div id="revealView" style="height: 800px; width: 100%;"></div>
        
            <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js" ></script>
            <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js" ></script>    
            <script src="https://dl.revealbi.io/reveal/libs/1.7.0/infragistics.reveal.js"></script>
        
            <script type="text/javascript">      
                $.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/"); 
        
                load().catch(err =>{
                document.getElementById("revealView").innerHTML = err;
                });
                
                async function load() {
                ${code}  
                }
            </script>
            </body>
            </html>
        `;

        setSrcDoc(documentContents);
    }

    function resetCode() {
        setCode(defaultCode);
    }

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
   }

    return (
        <Layout title="Developer Playground" description="">
            <div className={DocRootStyles.docRoot}>
                <PageSideBar items={ApiFeatures} onItemClick={onFeatureClick}/>
                <main className={clsx(MainStyles.docMainContainer)}>
                    <div className="col" style={{ padding: "0" }}>
                        <div className={styles.executionBar} >
                            <button onClick={() => runCode(editorRef.current.getValue())}><Translate id="playground.runButton">Run</Translate></button>
                            <button onClick={() => resetCode()}><Translate id="playground.resetButton">Reset</Translate></button>
                        </div>
                        <div style={{ border: "0px solid black" }}>
                            <CodeEditor height="350px" value={code} language={"javascript"} ref={editorRef} />
                        </div>
                        <div className={styles.iFrameContainer}>
                            <iframe title="result" srcDoc={srcDoc} style={{ width: "100%", height: "825px" }} />
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    )
}