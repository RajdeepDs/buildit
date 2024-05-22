import React, { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import type { Editor } from "@tiptap/react";

import { Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { DropdownButton } from "../../ui/Dropdown";
import { Icon } from "../../ui/Icon";
import { Surface } from "../../ui/Surface";
import { Toolbar } from "../../ui/Toolbar";
import useContentItemActions from "./hooks/useContentItemActions";
import { useData } from "./hooks/useData";

export type ContentItemMenuProps = {
  editor: Editor;
};

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(
    editor,
    data.currentNode,
    data.currentNodePos,
  );

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta("lockDragHandle", true);
    } else {
      editor.commands.setMeta("lockDragHandle", false);
    }
  }, [editor, menuOpen]);

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [-2, 16],
        zIndex: 99,
      }}
    >
      <div className="flex items-center gap-1">
        <Toolbar.Button onClick={actions.handleAdd}>
          <Icons.plus className="h-4 w-4" />
        </Toolbar.Button>
        <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Popover.Trigger asChild>
            <Toolbar.Button>
              <Icons.gripVertical className="h-4 w-4" />
            </Toolbar.Button>
          </Popover.Trigger>
          <Popover.Content side="bottom" align="start" sideOffset={8}>
            <Surface className="flex min-w-[16rem] flex-col space-y-2 p-2">
              <Popover.Close>
                <DropdownButton
                  onClick={actions.resetTextFormatting}
                  className="border px-2 py-1"
                >
                  <Icons.removeFormatting className="h-4 w-4" />
                  Clear formatting
                </DropdownButton>
              </Popover.Close>
              <Popover.Close>
                <DropdownButton
                  onClick={actions.copyNodeToClipboard}
                  className="border px-2 py-1"
                >
                  <Icons.clipBoard className="h-4 w-4" />
                  Copy to clipboard
                </DropdownButton>
              </Popover.Close>
              <Popover.Close>
                <DropdownButton
                  onClick={actions.duplicateNode}
                  className="border px-2 py-1"
                >
                  <Icons.copy className="h-4 w-4" />
                  Duplicate
                </DropdownButton>
              </Popover.Close>
              <Toolbar.Divider horizontal />
              <Popover.Close>
                <DropdownButton
                  onClick={actions.deleteNode}
                  className="border px-2 py-1 text-red-500 dark:text-red-400"
                >
                  <Icons.trash2 className="h-4 w-4" />
                  Delete
                </DropdownButton>
              </Popover.Close>
            </Surface>
          </Popover.Content>
        </Popover.Root>
      </div>
    </DragHandle>
  );
};
