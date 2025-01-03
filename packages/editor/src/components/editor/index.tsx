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
  onBlur?: () => void
  onChange: (value: Value) => void
  autoFocus?: boolean
  readOnly?: boolean
}

/**
 * The Editor component.
 * @param props The props for the editor component.
 * @param props.content The initial content of the editor.
 * @param props.onBlur The callback function to call when the content changes.
 * @param props.onChange The callback function to call when the editor loses focus.
 * @param props.autoFocus Whether the editor should be focused when it mounts.
 * @param props.readOnly Whether the editor should be read-only.
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
          'relative z-40',
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
          className='p-0 min-h-[300px]'
          placeholder='Add description...'
        />
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </div>
    </Plate>
  )
}
