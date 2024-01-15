"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

interface EditorProps {
  initialContent: string;
  onChange: (value: string) => void;
}

const Editor = ({ initialContent, onChange }: EditorProps) => {
  const editor: BlockNoteEditor = useBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} theme={"light"} />;
};

export default Editor;
