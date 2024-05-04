import useSWR from "swr";

import { fetcher } from "../utils/fetcher";

type TUser = {
  id: string;
  name: string;
  username: string | null;
  email: string;
  emailVerified: string | null;
  image: string;
  password: string | null;
  onboarding: boolean;
  role: string;
  isTwoFactorEnabled: boolean;
};

export default function useUser() {
  const { data, isLoading, error } = useSWR<TUser>(`/api/user`, fetcher);

  return {
    user: data,
    isLoading,
    error,
  };
}
