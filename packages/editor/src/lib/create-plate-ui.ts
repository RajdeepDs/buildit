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
import { PlateLeaf } from '@udecode/plate-common'
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate-heading'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'

import { BlockquoteElement } from '../components/plate-ui/blockquote-element'
import { CodeBlockElement } from '../components/plate-ui/code-block-element'
import { CodeLeaf } from '../components/plate-ui/code-leaf'
import { CodeLineElement } from '../components/plate-ui/code-line-element'
import { CodeSyntaxLeaf } from '../components/plate-ui/code-syntax-leaf'
import { HeadingElement } from '../components/plate-ui/heading-element'
import { ParagraphElement } from '../components/plate-ui/paragraph-element'
import { withPlaceholders } from '../components/plate-ui/placeholder'
import { withDraggables } from '../components/plate-ui/with-draggables'

export const createPlateUI = (
  overrideByKey?: Partial<Record<string, PlatePluginComponent>>,
  {
    draggable,
    placeholder,
  }: { draggable?: boolean; placeholder?: boolean } = {},
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

    [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
    [MARK_CODE]: CodeLeaf,
    [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
    [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
    [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
    [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
    [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
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
  if (draggable) {
    components = withDraggables(components)
  }

  return components
}
