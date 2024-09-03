import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import {
  collapseSelection,
  focusEditor,
  getNodeEntries,
  isBlock,
  toggleNodeType,
  useEditorRef,
  useEditorSelector,
} from '@udecode/plate-common'
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from '@udecode/plate-heading'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'

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
    description: 'Regular text',
    icon: Icons.paragraph,
    label: 'Paragraph',
    value: ELEMENT_PARAGRAPH,
  },
  {
    description: 'Heading 1',
    icon: Icons.h1,
    label: 'Heading 1',
    value: ELEMENT_H1,
  },
  {
    description: 'Heading 2',
    icon: Icons.h2,
    label: 'Heading 2',
    value: ELEMENT_H2,
  },
  {
    description: 'Heading 3',
    icon: Icons.h3,
    label: 'Heading 3',
    value: ELEMENT_H3,
  },
]

const defaultItem =
  items.find((item) => item.value === ELEMENT_PARAGRAPH) ?? items[0]

/**
 * Dropdown menu to turn the selected node type into another node type.
 * This is used in the floating toolbar.
 * @param props The props for the turn into dropdown menu component.
 * @returns The turn into dropdown menu component.
 */
export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const value: string = useEditorSelector((editor) => {
    let initialNodeType: string = ELEMENT_PARAGRAPH
    let allNodesMatchInitialNodeType = false
    const codeBlockEntries = getNodeEntries(editor, {
      match: (n) => isBlock(editor, n),
      mode: 'highest',
    })
    const nodes = Array.from(codeBlockEntries)

    if (nodes.length > 0) {
      initialNodeType = nodes[0][0].type as string
      allNodesMatchInitialNodeType = nodes.every(([node]) => {
        const type: string = (node.type as string) || ELEMENT_PARAGRAPH

        return type === initialNodeType
      })
    }

    return allNodesMatchInitialNodeType ? initialNodeType : ELEMENT_PARAGRAPH
  }, [])

  const editor = useEditorRef()
  const openState = useOpenState()

  const selectedItem = items.find((item) => item.value === value) ?? defaultItem
  const { icon: SelectedItemIcon } = selectedItem

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          className='lg:min-w-[130px]  hover:bg-soft'
          isDropdown
          pressed={openState.open}
          tooltip='Turn into'
          size={'xs'}
        >
          <SelectedItemIcon className='size-4 lg:hidden text-surface ' />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='w-[450px]'>
        <DropdownMenuRadioGroup
          className='flex flex-col gap-0.5'
          onValueChange={(type) => {
            toggleNodeType(editor, { activeType: type })
            collapseSelection(editor)
            focusEditor(editor)
          }}
          value={value}
        >
          {items.map(({ label, value: itemValue }) => (
            <DropdownMenuRadioItem
              className='min-w-[500px]'
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
