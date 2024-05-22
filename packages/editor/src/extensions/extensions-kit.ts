"use client";

import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

import { CustomDocument, Heading, TaskItem, TaskList } from ".";

export const ExtensionsKit = () => [
  CustomDocument,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
    document: false,
  }),
  Placeholder.configure({
    placeholder: "Title",
  }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
];
