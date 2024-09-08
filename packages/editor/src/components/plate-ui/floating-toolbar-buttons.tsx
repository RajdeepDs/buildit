import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react'
import { useEditorReadOnly } from '@udecode/plate-common/react'

import { Icons } from '../icons'
import { MarkToolbarButton } from './mark-toolbar-button'
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu'

/**
 *
 */
export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly()

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
            <Icons.bold className='h-4 w-4' />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={ItalicPlugin.key}
            tooltip='Italic (⌘+I)'
            size={'xs'}
          >
            <Icons.italic className='h-4 w-4' />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={UnderlinePlugin.key}
            tooltip='Underline (⌘+U)'
            size={'xs'}
          >
            <Icons.underline className='h-4 w-4' />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={StrikethroughPlugin.key}
            tooltip='Strikethrough (⌘+⇧+M)'
            size={'xs'}
          >
            <Icons.strikethrough className='h-4 w-4' />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={CodePlugin.key}
            tooltip='Code (⌘+E)'
            size={'xs'}
          >
            <Icons.code className='h-4 w-4' />
          </MarkToolbarButton>
        </>
      )}
    </>
  )
}
