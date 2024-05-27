"use client";

import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

import {
  Color,
  CustomDocument,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  Link,
  SlashCommand,
  Subscript,
  Superscript,
  TaskItem,
  TaskList,
  TextAlign,
  TextStyle,
  Underline,
} from ".";

export const ExtensionsKit = () => [
  // CustomDocument,
  TaskList,
  Underline,
  Subscript,
  Superscript,
  TextStyle,
  Color,
  Highlight,
  FontFamily,
  FontSize,
  Link,
  SlashCommand,
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ["heading", "paragraph"],
  }),
  TaskItem.configure({
    nested: true,
  }),
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
    // document: false,
  }),
  // Placeholder.configure({
  //   placeholder: "Title",
  // }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
];
