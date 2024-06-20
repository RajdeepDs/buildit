import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import ProfileForm from "@/components/forms/profile-form";
import SettingsHeader from "@/components/settings/settings-header";
import { getUser } from "@/lib/data/user/get-user";

export const metadata: Metadata = {
  title: {
    absolute: "Profile | Settings",
  },
  description: "Manage settings for your buildit profile.",
};

export default async function SettingsPage(): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <>
      <SettingsHeader
        title="Profile"
        description="Manage settings for your buildit profile."
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileForm />
      </HydrationBoundary>
    </>
  );
}
