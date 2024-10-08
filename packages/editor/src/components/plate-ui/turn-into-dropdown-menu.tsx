import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import { cn } from '@udecode/cn'
import {
  collapseSelection,
  getNodeEntries,
  isBlock,
} from '@udecode/plate-common'
import {
  focusEditor,
  ParagraphPlugin,
  useEditorRef,
  useEditorSelector,
} from '@udecode/plate-common/react'
import { HEADING_KEYS } from '@udecode/plate-heading'

import { Separator } from '@buildit/ui/separator'

import { Icons } from '../icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu'
import { ToolbarButton } from './toolbar'

const items = [
  {
    description: 'Paragraph',
    icon: Icons.paragraph,
    label: 'Paragraph',
    value: ParagraphPlugin.key,
  },
  {
    description: 'Heading 1',
    icon: Icons.h1,
    label: 'Heading 1',
    value: HEADING_KEYS.h1,
    className: 'text-base font-bold',
  },
  {
    description: 'Heading 2',
    icon: Icons.h2,
    label: 'Heading 2',
    value: HEADING_KEYS.h2,
    className: 'text-sm font-bold',
  },
  {
    description: 'Heading 3',
    icon: Icons.h3,
    label: 'Heading 3',
    value: HEADING_KEYS.h3,
    className: 'text-xs font-bold',
  },
]

const defaultItem = items.find((item) => item.value === ParagraphPlugin.key)!

/**
 * Dropdown menu to turn the selected node type into another node type.
 * This is used in the floating toolbar.
 * @param props The props for the turn into dropdown menu component.
 * @returns The turn into dropdown menu component.
 */
export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const value: string = useEditorSelector((editor) => {
    let initialNodeType: string = ParagraphPlugin.key
    let allNodesMatchInitialNodeType = false
    const codeBlockEntries = getNodeEntries(editor, {
      match: (n) => isBlock(editor, n),
      mode: 'highest',
    })
    const nodes = Array.from(codeBlockEntries)

    if (nodes.length > 0) {
      initialNodeType = nodes[0][0].type as string
      allNodesMatchInitialNodeType = nodes.every(([node]) => {
        const type: string = (node.type as string) || ParagraphPlugin.key

        return type === initialNodeType
      })
    }

    return allNodesMatchInitialNodeType ? initialNodeType : ParagraphPlugin.key
  }, [])

  const editor = useEditorRef()
  const openState = useOpenState()

  const selectedItem = items.find((item) => item.value === value) ?? defaultItem
  const { icon: SelectedItemIcon } = selectedItem

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          className='lg:min-w-[130px]'
          isDropdown
          pressed={openState.open}
          tooltip='Turn into'
          size={'xs'}
        >
          <SelectedItemIcon className='size-4 lg:hidden' />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <Separator orientation='vertical' className='h-4 bg-soft' />

      <DropdownMenuContent align='start' className='w-[450px]' sideOffset={8}>
        <DropdownMenuRadioGroup
          className='flex flex-col gap-0.5'
          onValueChange={(type) => {
            editor.tf.toggle.block({ type })
            collapseSelection(editor)
            focusEditor(editor)
          }}
          value={value}
        >
          {items.map(({ label, value: itemValue, className }) => (
            <DropdownMenuRadioItem
              className={cn('min-w-[500px]', className)}
              key={itemValue}
              value={itemValue}
            >
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
