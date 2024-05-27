"use client";

import React, { useEffect, useRef } from "react";
import { EditorContent } from "@tiptap/react";

import "../../styles/index.css";

import { Controller } from "react-hook-form";

import { useBlockEditor } from "../../hooks/useBlockEditor";
import { ContentItemMenu, LinkMenu, TextMenu } from "../menus";

interface BlockEditorProps {
  control?: any;
  name?: string;
}

export const BlockEditor = ({ control, name }: BlockEditorProps) => {
  const menuContainerRef = useRef(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { editor } = useBlockEditor();

  useEffect(() => {
    editor?.on("blur", ({ editor }) => {
      console.log(editor.getJSON());
    });
  }, [editor]);

  if (!editor) return null;

  if (editor && !control) {
    return (
      <div className="flex h-full" ref={menuContainerRef}>
        <div className="relative flex h-full w-full flex-1 flex-col px-3 py-1">
          <EditorContent
            editor={editor}
            ref={editorRef}
            className="flex-1 overflow-y-auto"
          />
          {/* <ContentItemMenu editor={editor} /> */}
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
          <div className="relative flex h-full w-full flex-1 flex-col px-3 py-1">
            <EditorContent
              editor={editor}
              ref={editorRef}
              className="flex-1 overflow-y-auto"
              onBlur={() => field.onChange(editor.getJSON())}
            />
            {/* <ContentItemMenu editor={editor} /> */}
            <LinkMenu editor={editor} appendTo={menuContainerRef} />
            <TextMenu editor={editor} />
          </div>
        </div>
      )}
    />
  );
};
