import { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import { ACTIONS } from "../Actions";
import './Editor.css'

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);
  const textareaRef = useRef(null); //


  // Add to Editor.js
useEffect(() => {
  const cursorActivityHandler = (instance) => {
    const cursor = instance.getCursor();
    socketRef.current.emit(ACTIONS.CURSOR_CHANGE, {
      roomId,
      cursor,
    });
  };

  if (editorRef.current) {
    editorRef.current.on("cursorActivity", cursorActivityHandler);
  }

  return () => {
    editorRef.current?.off("cursorActivity", cursorActivityHandler);
  };
}, [roomId, socketRef.current]);

  useEffect(() => {
    console.log([roomId, onCodeChange, socketRef]);
    const initEditor = () => {
      // Only initialize if not already created
      if (!editorRef.current) {
        const editor = CodeMirror.fromTextArea(textareaRef.current, {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        });
        
        editorRef.current = editor;
        editor.setSize(null, "100%");
        
        editor.on("change", (instance, changes) => {
          const { origin } = changes;
          const code = instance.getValue();
          onCodeChange(code);
          
          if (origin !== "setValue") {
            socketRef.current.emit(ACTIONS.CODE_CHANGE, {
              roomId,
              code,
            });
          }
        });
      }
    };

    initEditor();

    // Cleanup function
    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea(); // Properly destroy CodeMirror
        editorRef.current = null;
      }
    };
  }, [roomId, onCodeChange, socketRef.current]);

  useEffect(() => {
    const currentSocket = socketRef.current;

    const handleCodeChange = ({ code }) => {
      if (code !== null && editorRef.current) {
        editorRef.current.setValue(code);
      }
    };

    if (currentSocket) {
      currentSocket.on(ACTIONS.CODE_CHANGE, handleCodeChange);
    }

    return () => {
      currentSocket?.off(ACTIONS.CODE_CHANGE, handleCodeChange);
    };
  }, [socketRef.current]);

  return (
    <div className="editor-wrapper">
      <textarea 
        ref={textareaRef}
        style={{ display: "block", width: "100%", textAlign: "unset" }}
      />
    </div>
  );
}

export default Editor;
