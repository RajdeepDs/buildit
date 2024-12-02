'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, toast } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-strong group-[.toaster]:border-soft group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg',
          description: 'group-[.toast]:text-sub',
          actionButton: 'group-[.toast]:bg-strong group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-weak group-[.toast]:text-sub',
        },
      }}
      {...props}
    />
  )
}

export { toast as sonner, Toaster }
