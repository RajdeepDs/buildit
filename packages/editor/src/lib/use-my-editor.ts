import type { Value } from '@udecode/plate-common'

import { withProps } from '@udecode/cn'
import { AutoformatPlugin } from '@udecode/plate-autoformat/react'
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
  someNode,
} from '@udecode/plate-common'
import {
  createPlateEditor,
  ParagraphPlugin,
  PlateLeaf,
} from '@udecode/plate-common/react'
import { HEADING_KEYS, HEADING_LEVELS } from '@udecode/plate-heading'
import { HeadingPlugin } from '@udecode/plate-heading/react'
import { HighlightPlugin } from '@udecode/plate-highlight/react'
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react'
import { IndentListPlugin } from '@udecode/plate-indent-list/react'
import { IndentPlugin } from '@udecode/plate-indent/react'
import { TodoListPlugin } from '@udecode/plate-list/react'
import { MentionInputPlugin, MentionPlugin } from '@udecode/plate-mention/react'
import { NodeIdPlugin } from '@udecode/plate-node-id'
import { ResetNodePlugin } from '@udecode/plate-reset-node/react'
import {
  SlashInputPlugin,
  SlashPlugin,
} from '@udecode/plate-slash-command/react'
import { TabbablePlugin } from '@udecode/plate-tabbable/react'
import Prism from 'prismjs'

import { BlockquoteElement } from '../components/plate-ui/blockquote-element'
import { CodeBlockElement } from '../components/plate-ui/code-block-element'
import { CodeLeaf } from '../components/plate-ui/code-leaf'
import { CodeLineElement } from '../components/plate-ui/code-line-element'
import { CodeSyntaxLeaf } from '../components/plate-ui/code-syntax-leaf'
import { HeadingElement } from '../components/plate-ui/heading-element'
import { HrElement } from '../components/plate-ui/hr-element'
import { MentionElement } from '../components/plate-ui/mention-element'
import { MentionInputElement } from '../components/plate-ui/mention-input-element'
import { ParagraphElement } from '../components/plate-ui/paragraph-element'
import { SlashInputElement } from '../components/plate-ui/slash-input-element'
import { TodoListElement } from '../components/plate-ui/todo-list-element'
import { autoformatRules } from './autoformat-rules'

export const useMyEditor = (content: Value) => {
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
      CodeLinePlugin,
      CodeSyntaxPlugin,
      HorizontalRulePlugin,
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
      HighlightPlugin,

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
      AutoformatPlugin.configure({
        options: {
          rules: autoformatRules,
          enableUndoOnDelete: true,
        },
      }),
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
      //! Fix: Tabbable Plugin is not working - when pressing tab, the focus is not moving to the next element instead it is focusing the browser's window
      TabbablePlugin.configure(({ editor }) => ({
        options: {
          query: () => {
            if (isSelectionAtBlockStart(editor)) return false

            return !someNode(editor, {
              match: (n) => {
                return !!(
                  n.type &&
                  ([TodoListPlugin.key, CodeBlockPlugin.key].includes(
                    n.type as string,
                  ) ||
                    n[IndentListPlugin.key])
                )
              },
            })
          },
        },
      })),
    ],
    override: {
      components: {
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
      },
    },
    value: content,
  })
  return editor
}
