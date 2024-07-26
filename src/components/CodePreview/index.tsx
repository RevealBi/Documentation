import React, { ReactNode, useEffect, useRef, useState } from "react";
import CodeBlock from '@theme/CodeBlock';
import './code-preview.css';

interface CodeSnippetProps {
    children: ReactNode;
    previewHeight?: number;
    sourceOpen?: boolean;
}

const LANGUAGES = {
    HTML: 'html',
    JS: 'js',
    REACT: 'tsx',
    ANGULAR: 'ts',
};

const extractCodeBlocks = (children: ReactNode) => {
    const codeBlocks: { [key: string]: string | null } = {
        [LANGUAGES.HTML]: null,
        [LANGUAGES.JS]: null,
        [LANGUAGES.REACT]: null,
        [LANGUAGES.ANGULAR]: null,
    };

    React.Children.forEach(children, child => {
        if (typeof child === 'string') {
            return;
        } else if (React.isValidElement(child)) {
            const preElement = child.props.children;
            const codeElement: any = React.Children.toArray(preElement).find((c: any) => c && c.props && c.props.className);

            if (codeElement) {
                const language = codeElement.props.className.replace('language-', '');
                if (codeBlocks.hasOwnProperty(language)) {
                    codeBlocks[language] = codeElement.props.children;
                }
            }
        }
    });

    return codeBlocks;
};

const htmlTemplate = (body: string, script: string) => `
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://unpkg.com/@revealbi/ui@0.2.0/themes/light.css">
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
        <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
        <script src="https://dl.revealbi.io/reveal/libs/1.6.7/infragistics.reveal.js"></script>
        <script type="module">
            import { RevealSdkSettings } from "https://esm.sh/@revealbi/ui";
            RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
        </script>
        <style>
            html, body {
                height: 100%;
                margin: 0;
                padding: 0;
            }
        </style>
    </head>
    <body>
        ${body}
        <script>
            ${script}
        </script>
    </body>
    </html>
`;

const Iframe = ({ srcDoc, height }: { srcDoc: string, height: number }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    
    useEffect(() => {
        if (iframeRef.current && height === 0) {
            const iframe = iframeRef.current;
            iframe.onload = () => {
                const { contentWindow } = iframe;
                if (contentWindow && contentWindow.document && contentWindow.document.body) {
                    iframe.style.height = contentWindow.document.body.scrollHeight + 16 + 'px';
                }
            };
        }
    }, [srcDoc]);

    return (
        <iframe
            ref={iframeRef}
            srcDoc={srcDoc}
            style={{ width: '100%', height: `${height}px`, border: 'none' }}
        ></iframe>
    );
};

const CodeSnippet = ({ language, code }: { language: string, code: string }) => (
    <CodeBlock language={language} className="code-block">
        {code}
    </CodeBlock>
);

const CodePreview: React.FC<CodeSnippetProps> = ({ children, previewHeight = 150, sourceOpen = false }) => {
    const [currentTab, setCurrentTab] = useState(LANGUAGES.HTML);
    const [showSource, setShowSource] = useState(sourceOpen);

    const codeBlocks = extractCodeBlocks(children);
    const srcDoc = htmlTemplate(codeBlocks[LANGUAGES.HTML] as string, codeBlocks[LANGUAGES.JS] as string);

    const renderCodeSnippet = () => {
        const code = codeBlocks[currentTab];
        return code ? <CodeSnippet language={currentTab} code={code} /> : null;
    };

    const openCodePen = () => {
        const reactVersion = '18.3.1';
        let htmlTemplate = codeBlocks[LANGUAGES.HTML] || '';
        let cssTemplate = 'html, body, #root { height: 100%; }';
        let jsTemplate = codeBlocks[LANGUAGES.JS] || '';
        let jsPreProcessor = 'none';
        let editors = '101'; // default editors (HTML, CSS, JS)
        let jsExternal = [
            `https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js`,
            `https://unpkg.com/dayjs@1.8.21/dayjs.min.js`,
            `https://dl.revealbi.io/reveal/libs/1.6.7/infragistics.reveal.js`,
            `https://unpkg.com/@revealbi/ui@0.2.1/index.umd.js`,
        ];

        if (htmlTemplate.includes("<rv-reveal-view") || htmlTemplate.includes("<rv-visualization-viewer")) {
            jsTemplate = 
            `import { RevealSdkSettings } from "https://esm.sh/@revealbi/ui";\n` +
            `RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";\n` +
            `\n${jsTemplate}\n`;
            
            jsExternal.pop(); //remove the reveal ui script
        }

        if (currentTab === LANGUAGES.REACT) {
            jsPreProcessor = 'babel';
            editors = '0010'
            htmlTemplate = '<div id="root"></div>';
            jsTemplate =
            `import React, { useRef, useState, useEffect } from 'https://esm.sh/react@${reactVersion}';\n` +
            `import ReactDOM from 'https://esm.sh/react-dom@${reactVersion}';\n` +
            `import { RevealSdkSettings } from "https://esm.sh/@revealbi/ui";\n` +
            `RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";\n` +
            `\n${codeBlocks[LANGUAGES.REACT]}\n` +
            `ReactDOM.render(<App />, document.getElementById('root'));`;
        }

        const codepenData: any = {
            title: "Code Preview",
            html: htmlTemplate,
            js: jsTemplate,
            css: cssTemplate,
            js_pre_processor: jsPreProcessor,
            js_external: jsExternal,
            css_external: "https://unpkg.com/@revealbi/ui@0.2.0/themes/light.css",
            editors: editors,
        };

        const form = document.createElement('form');
        form.action = 'https://codepen.io/pen/define';
        form.method = 'POST';
        form.target = '_blank';
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'data';
        input.value = JSON.stringify(codepenData).replace(/"/g, "&quot;").replace(/'/g, "&apos;"); // Quotes will screw up the JSON
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    };

    return (
        <div className="interactive-code-preview">
            <div style={{ padding: '24px' }}>
                <Iframe srcDoc={srcDoc} height={previewHeight} />
            </div>

            {showSource && (
                <div className="code-snippet">
                    {renderCodeSnippet()}
                </div>
            )}

            <div className="code-tabs-container">
                <div className="source-toggle">
                    <button onClick={() => setShowSource(!showSource)}>
                        SOURCE {currentTab ? '↑' : '↓'}
                    </button>
                </div>
                <div className="tabs">
                    {Object.keys(LANGUAGES).map(lang => (
                        codeBlocks[LANGUAGES[lang]] && (
                            <button
                                key={lang}
                                onClick={() => setCurrentTab(LANGUAGES[lang])}
                                className={currentTab === LANGUAGES[lang] ? 'active' : ''}
                            >
                                {lang.toUpperCase()}
                            </button>
                        )
                    ))}
                    <a onClick={openCodePen} target="_blank" rel="noopener noreferrer">
                        CODEPEN
                    </a>
                </div>
            </div>
        </div>
    );
};
export default CodePreview;
