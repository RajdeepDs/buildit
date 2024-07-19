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

import { createProject } from "@/lib/actions/project/create-project";
import { MutationResult } from "@/lib/actions/types";
import { CreateProjectSchema } from "@/schemas/project";
import { TTeam } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewProjectForm({
  onOpenChange,
  team,
}: {
  onOpenChange: (isOpen: boolean) => void;
  team: TTeam;
}): JSX.Element {
  const router = useRouter();
  console.log(team);

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
        teamId: team.id as string,
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
    if (team) {
      mutation.mutate(values);
    }
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
            className="w-fit"
            disabled={mutation.isPending || mutation.isSuccess}
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
