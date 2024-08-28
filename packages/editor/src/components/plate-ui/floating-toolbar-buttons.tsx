import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks'
import { useEditorReadOnly } from '@udecode/plate-common'

import { Icons } from '../icons'
import { MarkToolbarButton } from './mark-toolbar-button'
import { MoreDropdownMenu } from './more-dropdown-menu'
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu'

/**
 * Floating toolbar buttons.
 * @returns The floating toolbar buttons component.
 */
export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly()

  return (
    <>
      {!readOnly && (
        <>
          <TurnIntoDropdownMenu />

          <MarkToolbarButton
            nodeType={MARK_BOLD}
            tooltip='Bold (⌘+B)'
            size={'xs'}
          >
            <Icons.bold className='h-4 w-4' />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_ITALIC}
            tooltip='Italic (⌘+I)'
            size={'xs'}
          >
            <Icons.italic className='h-4 w-4' />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_UNDERLINE}
            tooltip='Underline (⌘+U)'
            size={'xs'}
          >
            <Icons.underline className='h-4 w-4' />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_STRIKETHROUGH}
            tooltip='Strikethrough (⌘+⇧+M)'
            size={'xs'}
          >
            <Icons.strikethrough className='h-4 w-4' />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_CODE}
            tooltip='Code (⌘+E)'
            size={'xs'}
          >
            <Icons.code className='h-4 w-4' />
          </MarkToolbarButton>
        </>
      )}

      <MoreDropdownMenu />
    </>
  )
}
