import { useState } from 'react'

import { cn, withRef } from '@udecode/cn'
import { PlateElement } from '@udecode/plate-common/react'
import { getMentionOnSelectItem } from '@udecode/plate-mention'

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox'

const onSelectItem = getMentionOnSelectItem()

export const MentionInputElement = withRef<typeof PlateElement>(
  ({ className, ...props }, ref) => {
    const { children, editor, element } = props
    const [search, setSearch] = useState('')

    return (
      <PlateElement
        as='span'
        data-slate-value={element['value']}
        ref={ref}
        {...props}
      >
        <InlineCombobox
          element={element}
          setValue={setSearch}
          showTrigger={false}
          trigger='@'
          value={search}
        >
          <span
            className={cn(
              'inline-block rounded-md bg-soft px-1 py-0.5 align-baseline text-sm',
              className,
            )}
          >
            <InlineComboboxInput />
          </span>

          <InlineComboboxContent className='my-1.5' gutter={5}>
            <InlineComboboxEmpty>No results found</InlineComboboxEmpty>

            {MENTIONABLES.map((item) => (
              <InlineComboboxItem
                key={item.key}
                onClick={() => {
                  onSelectItem(editor, item, search)
                }}
                value={item.text}
              >
                {item.text}
              </InlineComboboxItem>
            ))}
          </InlineComboboxContent>
        </InlineCombobox>

        {children}
      </PlateElement>
    )
  },
)

export const MENTIONABLES = [
  { key: '1', text: 'Adi Gallia' },

  { key: '2', text: 'Admiral Trench' },

  { key: '3', text: 'Aks Moe' },

  { key: '4', text: 'AP-5' },

  { key: '5', text: 'AZI-3' },
  { key: '6', text: 'Bala-Tik' },

  { key: '7', text: 'BB-8' },
  { key: '8', text: 'BB-9E' },
]
