import React, { ReactNode, useEffect, useRef, useState } from "react";
import './code-preview.css';
import CodeBlock from '@theme/CodeBlock';

interface CodeSnippetProps {
    children: ReactNode;
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
    <head></head>
    <body>
    ${body}
    <script>${script}</script>
    </body>
    </html>
`;

const Iframe = ({ srcDoc }: { srcDoc: string }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current) {
            const iframe = iframeRef.current;
            iframe.onload = () => {
                iframe.style.height = iframe.contentWindow?.document.body.scrollHeight + 16 + 'px';
            };
        }
    }, [srcDoc]);

    return (
        <iframe
            ref={iframeRef}
            srcDoc={srcDoc}
            style={{ width: '100%', border: 'none' }}
        ></iframe>
    );
};

const CodeSnippet = ({ language, code }: { language: string, code: string }) => (
    <CodeBlock language={language} className="code-block">
        {code}
    </CodeBlock>
);

const CodePreview: React.FC<CodeSnippetProps> = ({ children }) => {
    const [currentTab, setCurrentTab] = useState(LANGUAGES.HTML);
    const [showSource, setShowSource] = useState(true);

    const codeBlocks = extractCodeBlocks(children);
    const srcDoc = htmlTemplate(codeBlocks[LANGUAGES.HTML] as string, codeBlocks[LANGUAGES.JS] as string);

    const renderCodeSnippet = () => {
        const code = codeBlocks[currentTab];
        return code ? <CodeSnippet language={currentTab} code={code} /> : null;
    };

    const openCodePen = () => {
        const reactVersion = '18.2.0';
        let htmlTemplate = codeBlocks[LANGUAGES.HTML] || '';
        let cssTemplate = '';
        let jsTemplate = codeBlocks[LANGUAGES.JS] || '';
        let jsPreProcessor = 'none';
        let editors = '101'; // default editors (HTML, CSS, JS)

        if (currentTab === LANGUAGES.REACT) {
            jsPreProcessor = 'babel';
            editors = '0010'
            htmlTemplate = '<div id="root"></div>';
            jsTemplate =
            `import React from 'https://esm.sh/react@${reactVersion}';\n` +
            `import ReactDOM from 'https://esm.sh/react-dom@${reactVersion}';\n` +
            `\n${codeBlocks[LANGUAGES.REACT]}\n` +
            `ReactDOM.render(<App />, document.getElementById('root'));`;
            
        }

        const codepenData: any = {
            title: "Code Preview",
            html: htmlTemplate,
            js: jsTemplate,
            css: cssTemplate,
            js_pre_processor: jsPreProcessor,
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
                <Iframe srcDoc={srcDoc} />
            </div>

            {showSource && (
                <div className="code-snippet">
                    {renderCodeSnippet()}
                </div>
            )}

            <div className="tabs-container">
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
