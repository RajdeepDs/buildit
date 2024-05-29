import { useEditor } from "@tiptap/react";

import { ExtensionsKit } from "../extensions/extensions-kit";

export const useBlockEditor = ({
  content,
}: {
  content: string | undefined;
}) => {
  const editor = useEditor({
    autofocus: true,
    editable: true,
    content: content,
    extensions: [...ExtensionsKit()],
  });

  return { editor };
};
