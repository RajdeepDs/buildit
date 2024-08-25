import type { PlateRenderElementProps } from '@udecode/plate-common'

import { PlateElement, toggleNodeType } from '@udecode/plate-common'
import { insertInlineDate } from '@udecode/plate-date'
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from '@udecode/plate-heading'
import { ListStyleType, toggleIndentList } from '@udecode/plate-indent-list'

import { Icons } from '../../components/icons'

interface SlashCommandRule {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  onSelect: (editor: any) => void
  value: string
  keywords?: string[]
}

const rules: SlashCommandRule[] = [
  {
    icon: Icons.h1,
    onSelect: (editor) => {
      toggleNodeType(editor, { activeType: ELEMENT_H1 })
    },
    value: 'Heading 1',
  },
  {
    icon: Icons.h2,
    onSelect: (editor) => {
      toggleNodeType(editor, { activeType: ELEMENT_H2 })
    },
    value: 'Heading 2',
  },
  {
    icon: Icons.h3,
    onSelect: (editor) => {
      toggleNodeType(editor, { activeType: ELEMENT_H3 })
    },
    value: 'Heading 3',
  },
  {
    icon: Icons.ul,
    keywords: ['ul', 'unordered list'],
    onSelect: (editor) => {
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Disc,
      })
    },
    value: 'Bulleted list',
  },
  {
    icon: Icons.ol,
    keywords: ['ol', 'ordered list'],
    onSelect: (editor) => {
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Decimal,
      })
    },
    value: 'Numbered list',
  },
  {
    icon: Icons.add,
    keywords: ['inline', 'date'],
    onSelect: (editor) => {
      insertInlineDate(editor)
    },
    value: 'Inline date',
  },
]

export const SlashInputElement = ({
  className,
  editor,
  element,
  children,
  ...props
}: PlateRenderElementProps) => {
  return (
    <PlateElement
      element={element}
      as='span'
      data-slate-value={element['value']}
      editor={editor}
      {...props}
    >
      {children}
    </PlateElement>
  )
}
