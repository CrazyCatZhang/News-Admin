import React, {useEffect, useState} from 'react';
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

function NewsEditor(props) {

    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState('') // 编辑器内容

    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容...',
    }

    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <div style={{border: '1px solid #ccc', zIndex: 100}} onBlur={() => {
            props.getContent(html)
        }}>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{borderBottom: '1px solid #ccc'}}
            />
            <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={editor => setHtml(editor.getHtml())}
                mode="default"
                style={{height: '500px', overflowY: 'hidden'}}
            />
        </div>
    );
}

export default NewsEditor;