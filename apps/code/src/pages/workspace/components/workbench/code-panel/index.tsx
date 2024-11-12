import { ISplitviewPanelProps } from "@/components/custom/dockview";
import Editor from '@monaco-editor/react';
import { useRef } from "react";
import ThemeOneDarkPro from './themes/onedarkpro.json';

export default function CodePanel({ api, params }: ISplitviewPanelProps) {
    const editorRef = useRef(null);

    function handleDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function handleBeforeMount(monaco) {
        monaco.editor.defineTheme('one-dark-pro', ThemeOneDarkPro);
    }

    return (
        <Editor
            className="panel"
            theme="one-dark-pro"
            height="100%"
            defaultLanguage="markdown"
            defaultValue="// some comment"
            beforeMount={handleBeforeMount}
            onMount={handleDidMount}
            options={{
                fontSize: 16,
                fontFamily: 'FiraCode',
                fontLigatures: true,
                wordWrap: 'on',
                minimap: {
                    enabled: false
                },
                bracketPairColorization: {
                    enabled: true
                },
                cursorBlinking: 'expand',
                formatOnPaste: true,
                suggest: {
                    showFields: false,
                    showFunctions: false
                },
                codeLens: true,
            }}
        />
    );
}