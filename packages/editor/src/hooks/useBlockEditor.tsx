import { useEditor } from "@tiptap/react";

import { ExtensionsKit } from "../extensions/extensions-kit";

export const useBlockEditor = () => {
  const editor = useEditor({
    autofocus: true,
    extensions: [...ExtensionsKit()],
  });
  return { editor };
};
