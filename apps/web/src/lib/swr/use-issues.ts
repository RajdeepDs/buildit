import useSWR from "swr";

import type { TIssues } from "@/types";
import { fetcher } from "../utils/fetcher";

export default function useIssues() {
  const {
    data: issues,
    isLoading,
    error,
  } = useSWR<TIssues>(`/api/issue`, fetcher);

  return {
    issues,
    isLoading,
    error,
  };
}
