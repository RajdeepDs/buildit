'use client'

import { useRef } from 'react'

import { cn } from '@udecode/cn'
import { Plate } from '@udecode/plate-common'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { plugins } from '../../lib/plate-plugins'
import { Editor as PlateEditor } from '../plate-ui/editor'
import { FloatingToolbar } from '../plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '../plate-ui/floating-toolbar-buttons'

/**
 * The Rich Text Editor component.
 * @returns The Plate js Editor component.
 */
export default function Editor() {
  const containerRef = useRef(null)
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        plugins={plugins}
        initialValue={basicEditorValue}
        normalizeInitialValue
      >
        <div
          ref={containerRef}
          className={cn(
            'relative',
            // Block selection
            '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4',
          )}
        >
          <PlateEditor focusRing={false} />

          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
        </div>
      </Plate>
    </DndProvider>
  )
}

export const basicEditorValue = [
  {
    children: [
      {
        text: '🌳 Blocks',
      },
    ],
    id: '1',
    type: 'h1',
  },
  {
    children: [
      {
        text: 'Easily create headings of various levels, from H1 to H6, to structure your content and make it more organized.',
      },
    ],
    id: '2',
    type: 'p',
  },
  {
    children: [
      {
        text: 'Create blockquote to emphasize important information or highlight quotes from external sources.',
      },
    ],
    id: '3',
    type: 'blockquote',
  },
  {
    children: [
      {
        children: [
          {
            text: '// Use code blocks to showcase code snippets',
          },
        ],
        type: 'code_line',
      },
      {
        children: [
          {
            text: 'function greet() {',
          },
        ],
        type: 'code_line',
      },
      {
        children: [
          {
            text: "  console.info('Hello World!');",
          },
        ],
        type: 'code_line',
      },
      {
        children: [
          {
            text: '}',
          },
        ],
        type: 'code_line',
      },
    ],
    id: '4',
    lang: 'javascript',
    type: 'code_block',
  },
  {
    children: [
      {
        text: '🌱 Marks',
      },
    ],
    id: '1',
    type: 'h1',
  },
  {
    children: [
      {
        text: 'Add style and emphasis to your text using the mark plugins, which offers a variety of formatting options.',
      },
    ],
    id: '2',
    type: 'p',
  },
  {
    children: [
      {
        text: 'Make text ',
      },
      {
        bold: true,
        text: 'bold',
      },
      {
        text: ', ',
      },
      {
        italic: true,
        text: 'italic',
      },
      {
        text: ', ',
      },
      {
        text: 'underlined',
        underline: true,
      },
      {
        text: ', or apply a ',
      },
      {
        bold: true,
        italic: true,
        text: 'combination',
        underline: true,
      },
      {
        text: ' of these styles for a visually striking effect.',
      },
    ],
    id: '3',
    type: 'p',
  },
  {
    children: [
      {
        text: 'Add ',
      },
      {
        strikethrough: true,
        text: 'strikethrough',
      },
      {
        text: ' to indicate deleted or outdated content.',
      },
    ],
    id: '4',
    type: 'p',
  },
  {
    children: [
      {
        text: 'Write code snippets with inline ',
      },
      {
        code: true,
        text: 'code',
      },
      {
        text: ' formatting for easy readability.',
      },
    ],
    id: '5',
    type: 'p',
  },
  {
    children: [
      {
        text: 'Press ',
      },
      {
        kbd: true,
        text: '⌘+B',
      },
      {
        text: ' to apply bold mark or ',
      },
      {
        kbd: true,
        text: '⌘+I',
      },
      {
        text: ' for italic mark.',
      },
    ],
    id: '6',
    type: 'p',
  },
]
