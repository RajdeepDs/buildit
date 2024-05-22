import { useEditor } from "@tiptap/react";

import { ExtensionsKit } from "../extensions/extensions-kit";

export const useBlockEditor = () => {
  const editor = useEditor({
    extensions: [...ExtensionsKit()],
  });
  return { editor };
};
