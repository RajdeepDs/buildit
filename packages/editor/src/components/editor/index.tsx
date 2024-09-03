'use client'

import { useRef } from 'react'

import type { Value } from '@udecode/plate-common'
import type { Control } from 'react-hook-form'

import { cn } from '@udecode/cn'
import { Plate } from '@udecode/plate-common'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Controller } from 'react-hook-form'

import { plugins } from '../../lib/plate-plugins'
import { Editor as PlateEditor } from '../plate-ui/editor'
import { FloatingToolbar } from '../plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '../plate-ui/floating-toolbar-buttons'

interface EditorProps {
  control: Control
  onBlur: () => void
  name: string
  content?: Value
}

/**
 * The Rich Text Editor component.
 * @param props The props for the editor component.
 * @param props.content The initial content of the editor.
 * @param props.onBlur The callback function to call when the content changes.
 * @param props.control The control object from react-hook-form.
 * @param props.name The name of the editor.
 * @returns The editor component.
 */
export default function Editor({
  content,
  onBlur,
  control,
  name,
}: EditorProps) {
  content = content ?? defaultValue
  const containerRef = useRef(null)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DndProvider backend={HTML5Backend}>
          <Plate
            plugins={plugins}
            initialValue={content}
            normalizeInitialValue
            onChange={(newValue) => {
              field.onChange(newValue)
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
                onBlur={() => {
                  onBlur()
                }}
              />

              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>
            </div>
          </Plate>
        </DndProvider>
      )}
    />
  )
}

// The default value for the editor, if content is not given. This is an empty paragraph.
const defaultValue = [
  {
    type: 'p',
    children: [
      {
        text: '',
      },
    ],
  },
]
