import useSWR from "swr";

import type { TIssue } from "@/types";
import { fetcher } from "../utils/fetcher";

export default function useIssue(issueId: string) {
  const { data, isLoading, error, mutate } = useSWR<TIssue>(
    `/api/issue/${issueId}`,
    fetcher,
  );

  return {
    issue: data as TIssue | undefined,
    isLoading,
    error,
    mutate,
  };
}
