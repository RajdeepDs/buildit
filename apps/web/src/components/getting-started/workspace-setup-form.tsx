import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "@sindresorhus/slugify";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import type { MutationResult } from "@/lib/actions/types";
import { createWorkspace } from "@/lib/actions/workspace/create-workspace";
import { WorkspaceSetupFormSchema } from "@/schemas/getting-started";

export default function WorkspaceSetupForm({
  nextStep,
}: {
  nextStep: () => void;
}) {
  const form = useForm<z.infer<typeof WorkspaceSetupFormSchema>>({
    resolver: zodResolver(WorkspaceSetupFormSchema),
    defaultValues: {
      workspaceName: "",
      workspaceSlug: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["createWorkspace"],
    mutationFn: async (
      values: z.infer<typeof WorkspaceSetupFormSchema>,
    ): Promise<MutationResult> => {
      return createWorkspace({
        name: values.workspaceName,
        slug: values.workspaceSlug,
      });
    },
    onSuccess: () => {
      nextStep();
    },
  });

  const onSubmit = (values: z.infer<typeof WorkspaceSetupFormSchema>) => {
    mutation.mutate(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="workspaceName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workspace name</FormLabel>
                <FormControl
                  onChange={() =>
                    form.setValue(
                      "workspaceSlug",
                      slugify(form.getValues("workspaceName")),
                    )
                  }
                >
                  <Input
                    placeholder="Acme, Inc."
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
            name="workspaceSlug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workspace URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="acme"
                    required
                    className="bg-white"
                    {...field}
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
            Continue
            <Icons.arrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
