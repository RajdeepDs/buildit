import type { PlatePluginComponent } from '@udecode/plate-common'

import { withProps } from '@udecode/cn'
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks'
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote'
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
} from '@udecode/plate-code-block'
import { PlateElement, PlateLeaf } from '@udecode/plate-common'
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate-heading'
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule'
import { MARK_KBD } from '@udecode/plate-kbd'
import {
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
} from '@udecode/plate-list'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'

import { BlockquoteElement } from '../components/plate-ui/blockquote-element'
import { CodeBlockElement } from '../components/plate-ui/code-block-element'
import { CodeLeaf } from '../components/plate-ui/code-leaf'
import { CodeLineElement } from '../components/plate-ui/code-line-element'
import { CodeSyntaxLeaf } from '../components/plate-ui/code-syntax-leaf'
import { HeadingElement } from '../components/plate-ui/heading-element'
import { HrElement } from '../components/plate-ui/hr-element'
import { KbdLeaf } from '../components/plate-ui/kbd-leaf'
import { ListElement } from '../components/plate-ui/list-element'
import { ParagraphElement } from '../components/plate-ui/paragraph-element'
import { withPlaceholders } from '../components/plate-ui/placeholder'
import { TodoListElement } from '../components/plate-ui/todo-list-element'

export const createPlateUI = (
  overrideByKey?: Partial<Record<string, PlatePluginComponent>>,
  { placeholder }: { placeholder?: boolean } = {},
) => {
  let components: Record<string, PlatePluginComponent> = {
    [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
    [ELEMENT_PARAGRAPH]: ParagraphElement,
    [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
    [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
    [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
    [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
    [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
    [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
    [ELEMENT_LI]: withProps(PlateElement, { as: 'li' }),
    [ELEMENT_UL]: withProps(ListElement, { variant: 'ul' }),
    [ELEMENT_OL]: withProps(ListElement, { variant: 'ol' }),
    [ELEMENT_TODO_LI]: TodoListElement,
    [ELEMENT_HR]: HrElement,
    [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
    [MARK_CODE]: CodeLeaf,
    [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
    [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
    [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
    [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
    [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
    [MARK_KBD]: KbdLeaf,
    [ELEMENT_CODE_BLOCK]: CodeBlockElement,
    [ELEMENT_CODE_LINE]: CodeLineElement,
    [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
  }

  if (overrideByKey) {
    Object.keys(overrideByKey).forEach((key) => {
      ;(components as any)[key] = (overrideByKey as any)[key]
    })
  }
  if (placeholder) {
    components = withPlaceholders(components)
  }

  return components
}
