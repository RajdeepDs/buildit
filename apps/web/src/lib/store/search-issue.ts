import { atom } from "jotai";

import type { TIssues } from "@/types";

export const toggleSearchAtom = atom<boolean>(false);
export const searchQueryAtom = atom<string>("");
export const searchResultsAtom = atom<TIssues>([]);
