"use client";

import React, { useRef } from "react";
import { EditorContent } from "@tiptap/react";

import { Button } from "@buildit/ui";

import "../../styles/index.css";

import { useBlockEditor } from "../../hooks/useBlockEditor";
import { ContentItemMenu } from "../menus/ContentItemMenu";

export const BlockEditor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { editor } = useBlockEditor();
  if (!editor) return null;
  return (
    <div className="">
      <div className="flex gap-x-2">
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </Button>
      </div>
      <EditorContent editor={editor} ref={editorRef} />
      <ContentItemMenu editor={editor} />
    </div>
  );
};
