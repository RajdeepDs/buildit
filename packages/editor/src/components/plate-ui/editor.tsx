import React from 'react'

import type { PlateContentProps } from '@udecode/plate-common/react'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@udecode/cn'
import { PlateContent } from '@udecode/plate-common/react'
import { cva } from 'class-variance-authority'

const editorVariants = cva(
  cn(
    'relative overflow-x-auto whitespace-pre-wrap break-words',
    'min-h-[80px] w-full rounded-md bg-white px-6 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none',
    '[&_[data-slate-placeholder]]:text-slate-500 [&_[data-slate-placeholder]]:!opacity-100',
    '[&_[data-slate-placeholder]]:top-[auto_!important]',
    '[&_strong]:font-bold',
  ),
  {
    defaultVariants: {
      focusRing: true,
      size: 'sm',
      variant: 'outline',
    },
    variants: {
      disabled: {
        true: 'cursor-not-allowed opacity-50',
      },
      focusRing: {
        false: '',
        true: 'focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:focus-visible:ring-slate-300',
      },
      focused: {
        true: 'ring-2 ring-slate-950 ring-offset-2 dark:ring-slate-300',
      },
      size: {
        md: 'text-base',
        sm: 'text-sm',
      },
      variant: {
        ghost: '',
        outline: 'border border-slate-200 dark:border-slate-800',
      },
    },
  },
)

export type EditorProps = PlateContentProps &
  VariantProps<typeof editorVariants>

const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      className,
      disabled,
      focusRing,
      focused,
      readOnly = false,
      size,
      variant,
      ...props
    },
    ref,
  ) => {
    return (
      <div className='relative w-full' ref={ref}>
        <PlateContent
          aria-disabled={disabled}
          className={cn(
            editorVariants({
              disabled,
              focusRing,
              focused,
              size,
              variant,
            }),
            className,
          )}
          data-plate-selectable
          readOnly={disabled ?? readOnly}
          {...props}
        />
      </div>
    )
  },
)
Editor.displayName = 'Editor'

export { Editor }
