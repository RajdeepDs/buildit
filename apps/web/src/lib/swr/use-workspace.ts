import useSWR from "swr";

import { fetcher } from "../utils/fetcher";

type TWorkspace = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

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
