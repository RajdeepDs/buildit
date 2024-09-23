import { create } from 'zustand'

export interface SidebarStore {
  hidden: boolean
  setHidden: (hidden: boolean) => void
  hover: boolean
  setHover: (hover: boolean) => void
}

const useSidebarStore = create((set) => ({
  hidden: false,
  setHidden: (hidden: boolean) => {
    set({ hidden })
  },
  hover: false,
  setHover: (hover: boolean) => {
    set({ hover })
  },
}))

export default useSidebarStore
