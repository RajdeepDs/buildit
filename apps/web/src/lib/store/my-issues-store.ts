import { create } from "zustand";

export type Store = {
  search: string;
  setSearch: (search: string) => void;
  filterByStatus: string;
  setFilterByStatus: (status: string) => void;
};

const useMyIssuesStore = create<Store>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
  filterByStatus: "",
  setFilterByStatus: (status) => set({ filterByStatus: status }),
}));

export default useMyIssuesStore;
