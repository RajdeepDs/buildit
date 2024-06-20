import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@buildit/ui";

import { updateOnboarding } from "@/lib/actions/onboarding";
import { updateProfile } from "@/lib/actions/settings/update-profile";
import type { MutationResult } from "@/lib/actions/types";
import { getWorkspaceSlug } from "@/lib/data/workspace/get-workspace-slug";
import { UserProfileFormSchema } from "@/schemas/getting-started";

export default function UserProfileForm() {
  const form = useForm<z.infer<typeof UserProfileFormSchema>>({
    resolver: zodResolver(UserProfileFormSchema),
    defaultValues: {
      fullname: "",
      username: "",
      bio: "",
    },
  });
  const router = useRouter();

  const onboardingMutation = useMutation({
    mutationKey: ["updateOnboarding"],
    mutationFn: async () => updateOnboarding(),
    onSuccess: () => {
      toast.success("Thank you for completing your onboarding!");
    },
  });

  const mutation = useMutation({
    mutationKey: ["updateUserProfile"],
    mutationFn: async (
      values: z.infer<typeof UserProfileFormSchema>,
    ): Promise<MutationResult> => {
      return updateProfile({
        name: values.fullname,
        username: values.username,
        bio: values.bio || "",
      });
    },
    onSuccess: async () => {
      const workspaceSlug = await getWorkspaceSlug();
      onboardingMutation.mutate();
      router.push(`/${workspaceSlug}/my-issues`);
    },
  });

  const onSubmit = (values: z.infer<typeof UserProfileFormSchema>) => {
    mutation.mutate(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    required
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe"
                    required
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="bg-white"
                    placeholder="Write something about yourself."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending || mutation.isSuccess}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
