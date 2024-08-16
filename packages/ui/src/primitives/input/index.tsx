import * as React from 'react'

import { cn } from '@/utils/cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-soft bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-soft focus-visible:outline-none focus:ring-offset-1 focus:border-soft focus-visible:ring-2 focus-visible:ring-soft disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

const InputWithContent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, content, ...props }, ref) => {
    return (
      <div
        className={cn(
          'has-[:focus-visible]:ring-2 text-strong has-[:focus-visible]:ring-soft has-[:focus]:ring-offset-1 flex items-center h-9 w-full rounded-md border border-soft bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-soft focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      >
        <p className='mr-1 text-sub font-medium'>{content}/ </p>
        <input
          type={type}
          ref={ref}
          {...props}
          className='outline-none text-strong bg-transparent border-none focus:ring-0 px-1 placeholder:text-soft text-sm'
        />
      </div>
    )
  },
)
InputWithContent.displayName = 'InputWithContent'

export { Input, InputWithContent }
