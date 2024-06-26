import { useEffect, useRef, useState } from "react";
import './code-preview.css';

const CodePreview = ({ html, react, angular }) => {
    const [currentTab, setCurrentTab] = useState('html');
    const [showSource, setShowSource] = useState(true);
    const iframeRef = useRef(null);

    const htmlTemplate = (bodyContent) => `
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
      ${bodyContent}
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
    }, [currentTab, html]);

    const renderCodeSnippet = () => {
        switch (currentTab) {
            case 'react':
                return <pre><code>{react}</code></pre>;
            case 'angular':
                return <pre><code>{angular}</code></pre>;
            default:
                return <pre><code>{html}</code></pre>;
        }
    };

    function openCodePen(): void {
        console.log('open codepen');
    }

    return (
        <div className="interactive-code-preview">
            <div style={{ padding: '24px' }}>
                <iframe ref={iframeRef}
                    srcDoc={htmlTemplate(html)}
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
