import React, { ReactNode, useEffect, useRef, useState } from "react";
import './code-preview.css';
import CodeBlock from '@theme/CodeBlock';

interface CodeSnippetProps {
    children: ReactNode;
}

interface Snippet {
    code: string | string[];
    element: React.ReactElement;
}

const CodePreview: React.FC<CodeSnippetProps> = ({ children }) => {
    const [currentTab, setCurrentTab] = useState('html');
    const [showSource, setShowSource] = useState(true);
    const iframeRef = useRef(null);

    const codeBlocks: { [key: string]: Snippet | null } = {
        html: null,
        js: null,
        tsx: null, //react
        ts: null, //angular
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
                    codeBlocks[language] = {
                        code: codeElement.props.children,
                        element: codeElement,
                    };
                }
            }
        }
    });

    const htmlTemplate = (body, script) => `
        <!DOCTYPE html>
        <html>
        <head></head>
        <body>
        ${body}
        <script>${script}</script>
        </body>
        </html>
    `;

    useEffect(() => {
        if (currentTab === 'html' && iframeRef.current) {
            const iframe = iframeRef.current;
            iframe.onload = () => {
                iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 16 + 'px';
            };
        }
    }, [currentTab]);

    const renderCodeSnippet = () => {
        switch (currentTab) {
            case 'react':
                return <CodeBlock language="tsx" className="code-block">{codeBlocks["tsx"].code}</CodeBlock>
            case 'angular':
                return <CodeBlock language="ts" className="code-block">{codeBlocks["ts"].code}</CodeBlock>
            case 'js':
                return <CodeBlock language="js" className="code-block">{codeBlocks["js"].code}</CodeBlock>
            default:
                return <CodeBlock language="html" className="code-block">{codeBlocks["html"].code}</CodeBlock>
        }
    };

    function openCodePen(): void {
        console.log('open codepen');
    }

    return (
        <div className="interactive-code-preview">
            <div style={{ padding: '24px' }}>
                <iframe ref={iframeRef}
                    srcDoc={htmlTemplate(codeBlocks["html"].code, codeBlocks["js"].code)}
                    style={{ width: '100%', border: 'none' }}
                ></iframe>
            </div>

            {showSource && (
                <div className="code-snippet">
                    {renderCodeSnippet()}
                </div>
            )}

            <div className="tabs-container">
                <div className="source-toggle">
                    <button onClick={() => setShowSource(!showSource)}>
                        SOURCE {showSource ? '↑' : '↓'}
                    </button>
                </div>
                <div className="tabs">
                    <button
                        onClick={() => setCurrentTab('html')}
                        className={currentTab === 'html' ? 'active' : ''}
                    >
                        HTML
                    </button>
                    <button
                        onClick={() => setCurrentTab('js')}
                        className={currentTab === 'js' ? 'active' : ''}
                    >
                        JS
                    </button>
                    <button
                        onClick={() => setCurrentTab('react')}
                        className={currentTab === 'react' ? 'active' : ''}
                    >
                        REACT
                    </button>
                    <button
                        onClick={() => setCurrentTab('angular')}
                        className={currentTab === 'angular' ? 'active' : ''}
                    >
                        ANGULAR
                    </button>
                    <a onClick={openCodePen} target="_blank" rel="noopener noreferrer">
                        CODEPEN
                    </a>
                </div>
            </div>
        </div>
    );
}
export default CodePreview;
