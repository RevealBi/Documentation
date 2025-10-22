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
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
        <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
        <script src="https://dl.revealbi.io/reveal/libs/1.8.0/infragistics.reveal.js"></script>
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
        <script type="module">
            import { defineRevealSdkWrappers } from "https://esm.sh/reveal-sdk-wrappers";
            defineRevealSdkWrappers();
            $.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");
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
            `https://dl.revealbi.io/reveal/libs/1.8.0/infragistics.reveal.js`,
        ];
        const revealSdkSettings = `import { defineRevealSdkWrappers } from "https://esm.sh/reveal-sdk-wrappers";\n` +
                                  `defineRevealSdkWrappers();\n` +
                                  `$.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");\n\n`;

        if (currentTab === LANGUAGES.REACT) {
            jsPreProcessor = 'typescript';
            editors = '0010'
            htmlTemplate = '<div id="root"></div>';
            jsTemplate =
            `import React, { useRef, useState, useEffect } from 'https://esm.sh/react';\n` +
            `import { createRoot } from 'https://esm.sh/react-dom/client';\n` +
            `$.ig.RevealSdkSettings.setBaseUrl("https://samples.revealbi.io/upmedia-backend/reveal-api/");\n` +
            `${codeBlocks[LANGUAGES.REACT]}\n` +
            `createRoot(document.getElementById('root')).render(<App />);`;
        } else {
            jsTemplate = `${revealSdkSettings}${jsTemplate}\n`;
        }

        const codepenData: any = {
            title: "Code Preview",
            html: htmlTemplate,
            js: jsTemplate,
            css: cssTemplate,
            js_pre_processor: jsPreProcessor,
            js_external: jsExternal,
            css_external: "",
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
            <div style={{ padding: '5px' }}>
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
                        SOURCE {showSource ? '↑' : '↓'}
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
