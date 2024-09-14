import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react'
import { BlockquotePlugin } from '@udecode/plate-block-quote/react'
import { useEditorReadOnly, useEditorRef } from '@udecode/plate-common/react'

import { Icons } from '../icons'
import { MarkToolbarButton } from './mark-toolbar-button'
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu'

/**
 * The floating toolbar buttons.
 * @returns JSX.Element
 */
export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly()
  const editor = useEditorRef()

  return (
    <>
      {!readOnly && (
        <>
          <TurnIntoDropdownMenu />

          <MarkToolbarButton
            nodeType={BoldPlugin.key}
            tooltip='Bold (⌘+B)'
            size={'xs'}
          >
            <Icons.bold className='size-4' />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={ItalicPlugin.key}
            tooltip='Italic (⌘+I)'
            size={'xs'}
          >
            <Icons.italic className='size-4' />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={UnderlinePlugin.key}
            tooltip='Underline (⌘+U)'
            size={'xs'}
          >
            <Icons.underline className='size-4' />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={StrikethroughPlugin.key}
            tooltip='Strikethrough (⌘+⇧+M)'
            size={'xs'}
          >
            <Icons.strikethrough className='size-4' />
          </MarkToolbarButton>
          <MarkToolbarButton size={'xs'} nodeType='' tooltip='Quote (⌘+⇧+.)'>
            <Icons.blockquote
              className='size-4'
              onClick={() => {
                editor.tf.toggle.block({ type: BlockquotePlugin.key })
              }}
            />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={CodePlugin.key}
            tooltip='Code (⌘+E)'
            size={'xs'}
          >
            <Icons.code className='size-4' />
          </MarkToolbarButton>
        </>
      )}
    </>
  )
}
