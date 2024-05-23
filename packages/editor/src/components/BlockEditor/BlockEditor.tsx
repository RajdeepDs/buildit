"use client";

import React, { useRef } from "react";
import { EditorContent } from "@tiptap/react";

import "../../styles/index.css";

import { useBlockEditor } from "../../hooks/useBlockEditor";
import { LinkMenu, TextMenu } from "../menus";
import { ContentItemMenu } from "../menus/ContentItemMenu";

export const BlockEditor = () => {
  const menuContainerRef = useRef(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { editor } = useBlockEditor();
  if (!editor) return null;
  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex h-full flex-1 flex-col ">
        <EditorContent
          editor={editor}
          ref={editorRef}
          className="flex-1 overflow-y-auto"
        />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
      </div>
    </div>
  );
};
