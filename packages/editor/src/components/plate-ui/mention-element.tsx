import type { TMentionElement } from '@udecode/plate-mention'

import { cn, withRef } from '@udecode/cn'
import { getHandler } from '@udecode/plate-common'
import { PlateElement, useElement } from '@udecode/plate-common/react'
import { useFocused, useSelected } from 'slate-react'

export const MentionElement = withRef<
  typeof PlateElement,
  {
    onClick?: (mentionNode: any) => void
    prefix?: string
    renderLabel?: (mentionable: TMentionElement) => string
  }
>(({ children, className, onClick, prefix, renderLabel, ...props }, ref) => {
  const element = useElement<TMentionElement>()
  const selected = useSelected()
  const focused = useFocused()

  return (
    <PlateElement
      className={cn(
        'inline-block cursor-pointer rounded-md bg-soft px-1 py-0.5 align-baseline text-sm font-medium dark:bg-slate-800',
        selected && focused && 'ring-2 ring-slate-950 dark:ring-slate-300',
        element.children[0]['bold'] === true && 'font-bold',
        element.children[0]['italic'] === true && 'italic',
        element.children[0]['underline'] === true && 'underline',
        className,
      )}
      contentEditable={false}
      data-slate-value={element.value}
      onClick={getHandler(onClick, element)}
      ref={ref}
      {...props}
    >
      {prefix}
      {renderLabel ? renderLabel(element) : element.value}
      {children}
    </PlateElement>
  )
})
