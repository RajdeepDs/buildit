import useSWR from "swr";

import type { TUser } from "@/types";
import { fetcher } from "../utils/fetcher";

export default function useUser() {
  const { data: user, isLoading, error } = useSWR<TUser>(`/api/user`, fetcher);

  return {
    user,
    isLoading,
    error,
  };
}
