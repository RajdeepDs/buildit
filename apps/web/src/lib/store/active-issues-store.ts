import { create } from "zustand";
import { Store } from "./my-issues-store";

const useActiveIssuesStore = create<Store>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
  filterByStatus: "",
  setFilterByStatus: (status) => set({ filterByStatus: status }),
}));

export default useActiveIssuesStore;
