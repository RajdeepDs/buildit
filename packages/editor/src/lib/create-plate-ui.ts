import type { PlatePluginComponent } from '@udecode/plate-common'

import { withProps } from '@udecode/cn'
import { MARK_HIGHLIGHT } from '@udecode/plate'
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks'
import { MARK_COMMENT } from '@udecode/plate-comments'
import { PlateElement, PlateLeaf } from '@udecode/plate-common'
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate-heading'
import { MARK_KBD } from '@udecode/plate-kbd'
import { ELEMENT_LI, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list'

import { CodeLeaf } from '../components/plate-ui/code-leaf'
import { CommentLeaf } from '../components/plate-ui/comment-leaf'
import { HeadingElement } from '../components/plate-ui/heading-element'
import { HighlightLeaf } from '../components/plate-ui/highlight-leaf'
import { KbdLeaf } from '../components/plate-ui/kbd-leaf'
import { ListElement } from '../components/plate-ui/list-element'
import { SlashInputElement } from '../components/plate-ui/slash-input-element'
import { ELEMENT_SLASH_INPUT } from './createSlashPlugin'

export const createPlateUI = (
  overrideByKey?: Partial<Record<string, PlatePluginComponent>>,
) => {
  const components: Record<string, PlatePluginComponent> = {
    [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
    [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
    [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
    [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
    [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
    [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
    [ELEMENT_LI]: withProps(PlateElement, { as: 'li' }),
    [ELEMENT_UL]: withProps(ListElement, { variant: 'ul' }),
    [ELEMENT_OL]: withProps(ListElement, { variant: 'ol' }),
    [ELEMENT_SLASH_INPUT]: SlashInputElement,
    [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
    [MARK_CODE]: CodeLeaf,
    [MARK_HIGHLIGHT]: HighlightLeaf,
    [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
    [MARK_KBD]: KbdLeaf,
    [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
    [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
    [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
    [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
    [MARK_COMMENT]: CommentLeaf,
  }

  return components
}
