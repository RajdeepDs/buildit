import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import ProfileForm from "@/components/forms/profile-form";
import SettingsHeader from "@/components/settings/settings-header";
import { getUser } from "@/lib/data/user/get-user";

export default async function SettingsPage(): Promise<JSX.Element> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <div className="mx-auto my-auto flex w-1/2 flex-col space-y-8 px-12">
      <SettingsHeader
        title="Profile"
        description="Manage settings for your buildit profile."
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileForm />
      </HydrationBoundary>
    </div>
  );
}
