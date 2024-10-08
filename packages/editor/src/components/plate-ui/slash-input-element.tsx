import { type ComponentType, type SVGProps } from 'react'

import type { PlateEditor } from '@udecode/plate-common/react'

import { withRef } from '@udecode/cn'
import { PlateElement } from '@udecode/plate-common/react'
import { HEADING_KEYS } from '@udecode/plate-heading'
import { ListStyleType, toggleIndentList } from '@udecode/plate-indent-list'

import { Icons } from '../icons'
import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox'
import { Separator } from './separator'

interface SlashCommandRule {
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  onSelect?: (editor: PlateEditor) => void
  value: string
  keywords?: string[] | undefined
}

const rules: SlashCommandRule[] = [
  {
    icon: Icons.h1,
    onSelect: (editor) => {
      editor.tf.toggle.block({ type: HEADING_KEYS.h1 })
    },
    value: 'Heading 1',
  },
  {
    icon: Icons.h2,
    onSelect: (editor) => {
      editor.tf.toggle.block({ type: HEADING_KEYS.h2 })
    },
    value: 'Heading 2',
  },
  {
    icon: Icons.h3,
    onSelect: (editor) => {
      editor.tf.toggle.block({ type: HEADING_KEYS.h3 })
    },
    value: 'Heading 3',
  },
  {
    value: 'Separator',
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
]

export const SlashInputElement = withRef<typeof PlateElement>(
  ({ className, ...props }, ref) => {
    const { children, editor, element } = props

    return (
      <PlateElement
        as='span'
        data-slate-value={element['value']}
        ref={ref}
        {...props}
      >
        <InlineCombobox element={element} trigger='/'>
          <span className='bg-soft rounded px-1 py-0.5'>
            <InlineComboboxInput />
          </span>

          <InlineComboboxContent
            gutter={5}
            className='z-50 pointer-events-auto'
          >
            <InlineComboboxEmpty>Not found</InlineComboboxEmpty>

            {rules.map(({ icon: Icon, keywords, onSelect, value }) => {
              if (onSelect && Icon) {
                return (
                  <InlineComboboxItem
                    key={value}
                    keywords={keywords!}
                    onClick={() => {
                      onSelect(editor)
                    }}
                    focusOnHover={true}
                    value={value}
                  >
                    <Icon aria-hidden className='mr-2 size-4 text-sub' />
                    {value}
                  </InlineComboboxItem>
                )
              }

              return <Separator />
            })}
          </InlineComboboxContent>
        </InlineCombobox>

        {children}
      </PlateElement>
    )
  },
)
