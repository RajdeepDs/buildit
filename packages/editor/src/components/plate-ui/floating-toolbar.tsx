'use client'

import type { FloatingToolbarState } from '@udecode/plate-floating'

import { cn, withRef } from '@udecode/cn'
import {
  PortalBody,
  useComposedRef,
  useEditorId,
  useEventEditorSelectors,
} from '@udecode/plate-common/react'
import {
  flip,
  offset,
  useFloatingToolbar,
  useFloatingToolbarState,
} from '@udecode/plate-floating'

import { Toolbar } from './toolbar'

export const FloatingToolbar = withRef<
  typeof Toolbar,
  {
    state?: FloatingToolbarState
  }
>(({ children, state, ...props }, componentRef) => {
  const editorId = useEditorId()
  const focusedEditorId = useEventEditorSelectors.focus()

  const floatingToolbarState = useFloatingToolbarState({
    editorId,
    focusedEditorId,
    ...state,
    floatingOptions: {
      middleware: [
        offset(12),
        flip({
          fallbackPlacements: [
            'top-start',
            'top-end',
            'bottom-start',
            'bottom-end',
          ],
          padding: 12,
        }),
      ],
      placement: 'top',
      ...state?.floatingOptions,
    },
  })

  const {
    hidden,
    props: rootProps,
    ref: floatingRef,
  } = useFloatingToolbar(floatingToolbarState)

  const ref = useComposedRef<HTMLDivElement>(componentRef, floatingRef)

  if (hidden) return null

  return (
    <PortalBody>
      <Toolbar
        className={cn(
          'absolute z-50 whitespace-nowrap border rounded-lg border-soft bg-white px-1 py-1 opacity-100 shadow-md print:hidden dark:border-slate-800 dark:bg-slate-950',
        )}
        ref={ref}
        {...rootProps}
        {...props}
      >
        {children}
      </Toolbar>
    </PortalBody>
  )
})
