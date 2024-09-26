import { create } from 'zustand'

export interface FloatingToolbarStore {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}

const useFloatingToolbarStore = create<FloatingToolbarStore>((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => {
    set({ isOpen })
  },
}))

export default useFloatingToolbarStore
