import useSWR from "swr";

import type { TWorkspace } from "@/types";
import { fetcher } from "../utils/fetcher";

export default function useWorkspace(slug: string) {
  const { data, isLoading, error } = useSWR<TWorkspace>(
    `/api/workspace/${slug}`,
    fetcher,
  );

  return {
    workspace: data,
    isLoading,
    error,
  };
}
