'use client'

import { useRef } from 'react'

import type { Value } from '@udecode/plate-common'

import { cn } from '@udecode/cn'
import { Plate } from '@udecode/plate-common/react'

import { useMyEditor } from '../../lib/use-my-editor'
import { Editor as PlateEditor } from '../plate-ui/editor'
import { FloatingToolbar } from '../plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '../plate-ui/floating-toolbar-buttons'

export interface EditorProps {
  content: Value
  onBlur: () => void
  onChange: (value: Value) => void
  autoFocus?: boolean
  readOnly?: boolean
}

/**
 * The Editor component.
 * @param props The props for the editor component.
 * @param props.content The initial content of the editor.
 * @param props.onBlur The callback function to call when the content changes.
 * @param props.onChange
 * @param props.autoFocus
 * @param props.readOnly
 * @returns The editor component.
 */
export default function Editor({
  content,
  onBlur,
  onChange,
  autoFocus = false,
  readOnly = false,
}: EditorProps) {
  const containerRef = useRef(null)
  const editor = useMyEditor(content)

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
        onChange(value)
      }}
    >
      <div
        ref={containerRef}
        className={cn(
          'relative',
          // Block selection
          '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4',
        )}
      >
        <PlateEditor
          focusRing={false}
          autoFocus={autoFocus}
          onBlur={onBlur}
          variant={'ghost'}
          readOnly={readOnly}
          className='px-0'
          placeholder=''
        />
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </div>
    </Plate>
  )
}
