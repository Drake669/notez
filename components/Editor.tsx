"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useEffect, useState } from "react";
import debounce from "@/lib/debounce";

interface EditorProps {
  initialContent: string;
  onChange: (value: string) => void;
}

const Editor = ({ initialContent, onChange }: EditorProps) => {
  const [debouncedOnEditorContentChange] = useState(() =>
    debounce((editor: BlockNoteEditor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    }, 600)
  );

  const editor = useBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      debouncedOnEditorContentChange(editor);
    },
  });

  return <BlockNoteView editor={editor} theme={"light"} />;
};

export default Editor;
