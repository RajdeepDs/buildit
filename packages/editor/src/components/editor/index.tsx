'use client'

import { useRef } from 'react'

import { cn, withProps } from '@udecode/cn'
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react'
import { BlockquotePlugin } from '@udecode/plate-block-quote/react'
import { ExitBreakPlugin, SoftBreakPlugin } from '@udecode/plate-break/react'
import {
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock,
} from '@udecode/plate-code-block'
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from '@udecode/plate-code-block/react'
import {
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
} from '@udecode/plate-common'
import {
  createPlateEditor,
  ParagraphPlugin,
  Plate,
  PlateLeaf,
} from '@udecode/plate-common/react'
import { HEADING_KEYS, HEADING_LEVELS } from '@udecode/plate-heading'
import { HeadingPlugin } from '@udecode/plate-heading/react'
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react'
import { IndentPlugin } from '@udecode/plate-indent'
import { IndentListPlugin } from '@udecode/plate-indent-list/react'
import { ListPlugin, TodoListPlugin } from '@udecode/plate-list/react'
import { MentionInputPlugin, MentionPlugin } from '@udecode/plate-mention/react'
import { NodeIdPlugin } from '@udecode/plate-node-id'
import { ResetNodePlugin } from '@udecode/plate-reset-node/react'
import { SlashInputPlugin, SlashPlugin } from '@udecode/plate-slash-command'
import Prism from 'prismjs'

import { BlockquoteElement } from '../plate-ui/blockquote-element'
import { CodeBlockElement } from '../plate-ui/code-block-element'
import { CodeLeaf } from '../plate-ui/code-leaf'
import { CodeLineElement } from '../plate-ui/code-line-element'
import { CodeSyntaxLeaf } from '../plate-ui/code-syntax-leaf'
import { Editor as PlateEditor } from '../plate-ui/editor'
import { FloatingToolbar } from '../plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '../plate-ui/floating-toolbar-buttons'
import { HeadingElement } from '../plate-ui/heading-element'
import { HrElement } from '../plate-ui/hr-element'
import { MentionElement } from '../plate-ui/mention-element'
import { MentionInputElement } from '../plate-ui/mention-input-element'
import { ParagraphElement } from '../plate-ui/paragraph-element'
import { withPlaceholders } from '../plate-ui/placeholder'
import { SlashInputElement } from '../plate-ui/slash-input-element'
import { TodoListElement } from '../plate-ui/todo-list-element'

/**
 * Editor component.
 * @returns JSX.Element
 */
export default function Editor() {
  const containerRef = useRef(null)
  const editor = useMyEditor()

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
        localStorage.setItem('editorContent', JSON.stringify(value))
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
        <PlateEditor focusRing={false} />
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </div>
    </Plate>
  )
}

export const useMyEditor = () => {
  const editor = createPlateEditor({
    plugins: [
      // Nodes
      HeadingPlugin,
      BlockquotePlugin,
      CodeBlockPlugin.configure({
        options: {
          prism: Prism,
        },
      }),
      HorizontalRulePlugin,
      ListPlugin,
      TodoListPlugin,
      SlashPlugin,
      MentionPlugin,
      MentionInputPlugin,

      // Marks
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      StrikethroughPlugin,
      CodePlugin,
      SubscriptPlugin,
      SuperscriptPlugin,

      // Block Style
      IndentPlugin.configure({
        inject: {
          targetPlugins: [
            ParagraphPlugin.key,
            BlockquotePlugin.key,
            CodeBlockPlugin.key,
            ...HEADING_LEVELS,
          ],
        },
      }),
      IndentListPlugin.extend({
        inject: {
          targetPlugins: [
            ParagraphPlugin.key,
            BlockquotePlugin.key,
            CodeBlockPlugin.key,
            ...HEADING_LEVELS,
          ],
        },
      }),

      // Functionality
      ExitBreakPlugin.configure({
        options: {
          rules: [
            {
              hotkey: 'mod+enter',
            },
            {
              hotkey: 'mod+shift+enter',
              before: true,
            },
            {
              hotkey: 'enter',
              query: {
                start: true,
                end: true,
                allow: HEADING_LEVELS,
              },
              relative: true,
              level: 1,
            },
          ],
        },
      }),
      NodeIdPlugin,
      ResetNodePlugin.configure({
        options: {
          rules: [
            {
              types: [BlockquotePlugin.key, TodoListPlugin.key],
              defaultType: ParagraphPlugin.key,
              hotkey: 'Enter',
              predicate: isBlockAboveEmpty,
            },
            {
              types: [BlockquotePlugin.key, TodoListPlugin.key],
              defaultType: ParagraphPlugin.key,
              hotkey: 'Backspace',
              predicate: isSelectionAtBlockStart,
            },
            {
              types: [CodeBlockPlugin.key],
              defaultType: ParagraphPlugin.key,
              onReset: unwrapCodeBlock,
              hotkey: 'Enter',
              predicate: isCodeBlockEmpty,
            },
            {
              types: [CodeBlockPlugin.key],
              defaultType: ParagraphPlugin.key,
              onReset: unwrapCodeBlock,
              hotkey: 'Backspace',
              predicate: isSelectionAtCodeBlockStart,
            },
          ],
        },
      }),
      SoftBreakPlugin.configure({
        options: {
          rules: [
            { hotkey: 'shift+enter' },
            {
              hotkey: 'enter',
              query: {
                allow: [CodeBlockPlugin.key, BlockquotePlugin.key],
              },
            },
          ],
        },
      }),
    ],
    override: {
      components: withPlaceholders({
        [BlockquotePlugin.key]: BlockquoteElement,
        [CodeBlockPlugin.key]: CodeBlockElement,
        [CodeLinePlugin.key]: CodeLineElement,
        [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
        [HorizontalRulePlugin.key]: HrElement,
        [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
        [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
        [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
        [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
        [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
        [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
        [SlashInputPlugin.key]: SlashInputElement,
        [MentionPlugin.key]: MentionElement,
        [MentionInputPlugin.key]: MentionInputElement,
        [ParagraphPlugin.key]: ParagraphElement,
        [TodoListPlugin.key]: TodoListElement,

        [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
        [CodePlugin.key]: CodeLeaf,
        [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
        [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
        [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
        [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
        [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
      }),
    },
    value: [
      {
        id: '1',
        type: ParagraphPlugin.key,
        children: [{ text: 'Hello, World!' }],
      },
    ],
  })
  return editor
}
