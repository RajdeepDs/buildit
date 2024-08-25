'use client'

import type { Value } from '@udecode/plate'
import type { Control } from 'react-hook-form'

import { Plate } from '@udecode/plate-common'
import { Controller } from 'react-hook-form'

import { platePlugins } from '../../lib/plate-plugins'
import { Editor } from '../plate-ui/editor'
import { FloatingToolbar } from '../plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '../plate-ui/floating-toolbar-buttons'

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

interface BlockEditorProps {
  control: Control
  onBlur: () => void
  name: string
  content?: Value
}

/**
 * Editor component. This is the main component that will be used to render the editor.
 * @param props The props for the editor component.
 * @param props.content The initial content of the editor.
 * @param props.onBlur The callback function to call when the content changes.
 * @param props.control The control object from react-hook-form.
 * @param props.name The name of the editor.
 * @returns The editor component.
 */
export default function BlockEditor({
  content,
  onBlur,
  control,
  name,
}: BlockEditorProps) {
  content = content ?? defaultValue
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Plate
          initialValue={content}
          plugins={platePlugins}
          onChange={(newValue) => {
            field.onChange(newValue)
          }}
        >
          <Editor
            placeholder='Type something here....'
            focusRing={false}
            onBlur={() => {
              onBlur()
            }}
          />
          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
        </Plate>
      )}
    />
  )
}
