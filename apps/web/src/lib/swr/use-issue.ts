import useSWR from "swr";

import { fetcher } from "../utils/fetcher";

export default function useIssue(issueId: string) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/issue/${issueId}`,
    fetcher,
  );

  return {
    issue: data,
    isLoading,
    error,
    mutate,
  };
}
