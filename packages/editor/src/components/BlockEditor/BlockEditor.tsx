"use client";

import { EditorContent } from "@tiptap/react";
import { useRef } from "react";
import { Controller } from "react-hook-form";
import { useBlockEditor } from "../../hooks/useBlockEditor";
import "../../styles/index.css";
import { LinkMenu, TextMenu } from "../menus";

interface BlockEditorProps {
  control?: any;
  onBlur?: () => void;
  name?: string;
  content?: string | null | undefined;
}

export const BlockEditor = ({
  control,
  name,
  content,
  onBlur,
}: BlockEditorProps) => {
  const menuContainerRef = useRef(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { editor } = useBlockEditor({ content: content || "" });

  if (!editor) return null;

  if (editor && !control) {
    return (
      <div className="flex h-full" ref={menuContainerRef}>
        <div className="relative flex h-full w-full flex-1 flex-col">
          <EditorContent
            editor={editor}
            ref={editorRef}
            className="flex-1 overflow-y-auto"
            onBlur={onBlur} // Call onBlur when the editor loses focus
          />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
        </div>
      </div>
    );
  }

  return (
    <Controller
      name={name || ""}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div className="flex h-full" ref={menuContainerRef}>
          <div className="flex h-full w-full flex-1 flex-col">
            <EditorContent
              editor={editor}
              ref={editorRef}
              className="flex-1 overflow-y-auto"
              onBlur={() => {
                field.onChange(editor.getJSON());
                if (onBlur) onBlur();
              }}
            />
            <LinkMenu editor={editor} appendTo={menuContainerRef} />
            <TextMenu editor={editor} />
          </div>
        </div>
      )}
    />
  );
};
