import { Document as TiptapDocument } from "@tiptap/extension-document";

export const CustomDocument = TiptapDocument.extend({
  content: "heading block*",
});

export default CustomDocument;
