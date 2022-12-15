import React from 'react';
import Editor from "@monaco-editor/react";
import {useColorMode} from '@docusaurus/theme-common';

interface EditorProps{
    language: string;
    height: string | number;
    value: string;
}

const CodeEditor = React.forwardRef(({language, height, value}: EditorProps, ref: React.MutableRefObject<any>) => {
    
    const {colorMode, setColorMode} = useColorMode();

    function handleEditorDidMount(editor, monaco) {
         ref.current = editor;
    }
    
    return (
        <Editor value={value} 
                theme={colorMode === "light" ? "light" : "vs-dark" } 
                defaultLanguage={language}
                language={language}
                height={height}
                onMount={handleEditorDidMount} />
    );
});

export default CodeEditor;