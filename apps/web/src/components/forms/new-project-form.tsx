import { zodResolver } from "@hookform/resolvers/zod";
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

import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationResult } from "@/lib/actions/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateProjectSchema } from "@/schemas/project";
import { createProject } from "@/lib/actions/project/create-project";
import { getTeams } from "@/lib/data/team/get-teams";

export default function NewProjectForm({
  onOpenChange,
}: {
  onOpenChange: (isOpen: boolean) => void;
}): JSX.Element {
  const router = useRouter();

  const { data: team } = useQuery({
    queryKey: ["team"],
    queryFn: async () => getTeams(),
  });

  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      projectName: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["createProject"],
    mutationFn: async (
      values: z.infer<typeof CreateProjectSchema>,
    ): Promise<MutationResult> => {
      return createProject({
        projectName: values.projectName,
        teamId: team ? team[0]?.teamId : "",
      });
    },
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Project created successfully!");
      } else {
        toast.error("Error creating project!");
      }
      onOpenChange(false);
      router.refresh();
    },
    onError: () => {
      toast.error("Error creating project!");
      onOpenChange(false);
    },
  });

  const onSubmit = (values: z.infer<typeof CreateProjectSchema>) => {
    mutation.mutate(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Acme"
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
