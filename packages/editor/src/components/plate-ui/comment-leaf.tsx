'use client'

import React from 'react'

import type { TCommentText } from '@udecode/plate-comments'
import type { PlateLeafProps, Value } from '@udecode/plate-common'

import { cn } from '@udecode/cn'
import { useCommentLeaf, useCommentLeafState } from '@udecode/plate-comments'
import { PlateLeaf } from '@udecode/plate-common'

export function CommentLeaf({
  className,
  ...props
}: PlateLeafProps<Value, TCommentText>) {
  const { children, leaf, nodeProps } = props

  const state = useCommentLeafState({ leaf })
  const { props: rootProps } = useCommentLeaf(state)

  if (!state.commentCount) return <>{children}</>

  let aboveChildren = <>{children}</>

  if (!state.isActive) {
    for (let i = 1; i < state.commentCount; i++) {
      aboveChildren = (
        <span className='bg-slate-900/20 dark:bg-slate-50/20'>
          {aboveChildren}
        </span>
      )
    }
  }

  return (
    <PlateLeaf
      {...props}
      className={cn(
        'border-b-2 border-b-primary/40',
        state.isActive
          ? 'bg-slate-900/40 dark:bg-slate-50/40'
          : 'bg-slate-900/20 dark:bg-slate-50/20',
        className,
      )}
      nodeProps={{
        ...rootProps,
        ...nodeProps,
      }}
    >
      {aboveChildren}
    </PlateLeaf>
  )
}
