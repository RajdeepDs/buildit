'use client'

import React from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import { cn } from '@buildit/ui/cn'

import { Icons } from '@/components/ui/icons'

export const ModalTrigger = Dialog.Trigger
export const ModalTitle = Dialog.Title

export const Modal = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  )
}

export const ModalContent = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string | undefined
}) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-10 bg-black/10 data-[state=closed]:animate-out data-[state=open]:animate-in' />
      <Dialog.Content
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[10%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[10%] fixed top-[20%] left-[50%] max-h-[650px] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-10%] border border-slate-200 bg-white p-4 flex flex-col gap-y-2 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:rounded-lg dark:border-slate-800 dark:bg-slate-950',
          className,
        )}
        aria-describedby={undefined}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export const ModalHeader = ({
  children,
  name,
}: {
  children: React.ReactNode
  name: string
}) => {
  const [isMaximized, setIsMaximized] = React.useState(false)

  const handleParentMaximize = () => {
    setIsMaximized(!isMaximized)
  }
  return (
    <nav className='flex items-center justify-between'>
      <div className='flex items-center space-x-1'>
        {children}
        <Icons.chevronRight className='h-4 w-4 text-soft' />
        <p className='text-sm'>{name}</p>
      </div>
      <div className='flex items-center space-x-2'>
        <button
          itemType='button'
          className='hidden cursor-pointer rounded p-0.5 hover:bg-soft/75'
          onClick={() => {
            handleParentMaximize()
          }}
        >
          {isMaximized ? (
            <Icons.minimize className='h-4 w-4' />
          ) : (
            <Icons.maximize className='h-4 w-4' />
          )}
        </button>
        <Dialog.Close className='cursor-pointer rounded p-0.5 hover:bg-soft/75'>
          <Icons.x className='h-4 w-4' />
        </Dialog.Close>
      </div>
    </nav>
  )
}

export const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
)
ModalFooter.displayName = 'ModalFooter'

export const VisuallyHide = ({ children }: { children: React.ReactNode }) => (
  <VisuallyHidden.Root asChild>{children}</VisuallyHidden.Root>
)
VisuallyHide.displayName = 'hidden'
