import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import { MARK_SUBSCRIPT, MARK_SUPERSCRIPT } from '@udecode/plate-basic-marks'
import { focusEditor, toggleMark, useEditorRef } from '@udecode/plate-common'

import { Icons } from '../../components/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu'
import { ToolbarButton } from './toolbar'

/**
 * Dropdown menu for more options.
 * @param props The props for the dropdown menu.
 * @returns The more dropdown menu component.
 */
export function MoreDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef()
  const openState = useOpenState()

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip='Insert' size={'xs'}>
          <Icons.more className='size-4' />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='start'
        className='flex max-h-[500px] min-w-[180px] flex-col gap-0.5 overflow-y-auto'
      >
        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              clear: [MARK_SUBSCRIPT, MARK_SUPERSCRIPT],
              key: MARK_SUPERSCRIPT,
            })
            focusEditor(editor)
          }}
        >
          <Icons.superscript className='mr-2 size-4 text-sub hover:text-strong' />
          Superscript
          {/* (⌘+,) */}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              clear: [MARK_SUPERSCRIPT, MARK_SUBSCRIPT],
              key: MARK_SUBSCRIPT,
            })
            focusEditor(editor)
          }}
        >
          <Icons.subscript className='mr-2 size-4 text-sub hover:text-strong' />
          Subscript
          {/* (⌘+.) */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
