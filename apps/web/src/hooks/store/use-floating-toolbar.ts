import useFloatingToolbarStore from '@/lib/store/floating-toolbar-store'

export const useFloatingToolbar = () => {
  const isOpen = useFloatingToolbarStore((state) => state.isOpen)
  const setOpen = useFloatingToolbarStore((state) => state.setOpen)

  return { isOpen, setOpen }
}
