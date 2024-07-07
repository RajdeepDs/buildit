import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@buildit/ui";

import { CreateTeamFormSchema } from "@/schemas/getting-started";
import { createTeam } from "@/lib/actions/team/create-team";
import { useMutation } from "@tanstack/react-query";
import { MutationResult } from "@/lib/actions/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewTeamForm({
  onOpenChange,
}: {
  onOpenChange: (isOpen: boolean) => void;
}): JSX.Element {
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateTeamFormSchema>>({
    resolver: zodResolver(CreateTeamFormSchema),
    defaultValues: {
      teamName: "",
      teamIdentifier: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["createTeam"],
    mutationFn: async (
      values: z.infer<typeof CreateTeamFormSchema>,
    ): Promise<MutationResult> => {
      return createTeam({
        teamName: values.teamName,
        teamIdentifier: values.teamIdentifier,
      });
    },
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Team created successfully!");
      } else {
        toast.error("Error creating team!");
      }
      onOpenChange(false);
      router.refresh();
    },
    onError: () => {
      toast.error("Error creating team!");
      onOpenChange(false);
    },
  });

  const onSubmit = (values: z.infer<typeof CreateTeamFormSchema>) => {
    mutation.mutate(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Acme Inc."
                    required
                    autoComplete="off"
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
            name="teamIdentifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Identifier</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ACME"
                    required
                    autoComplete="off"
                    maxLength={5}
                    {...field}
                    className="bg-white uppercase"
                  />
                </FormControl>
                <FormDescription>Will be used in issue IDs</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending || mutation.isSuccess}
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
