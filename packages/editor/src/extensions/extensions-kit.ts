"use client";

import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

import {
  Color,
  FontFamily,
  FontSize,
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
  }),
  Placeholder.configure({
    placeholder: "Add description...",
  }),
];
