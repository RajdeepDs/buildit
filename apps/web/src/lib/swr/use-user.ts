import useSWR from "swr";

import type { TUser } from "@/types";
import { fetcher } from "../utils/fetcher";

export default function useUser() {
  const { data: users, isLoading, error } = useSWR<TUser>(`/api/user`, fetcher);

  return {
    users,
    isLoading,
    error,
  };
}
