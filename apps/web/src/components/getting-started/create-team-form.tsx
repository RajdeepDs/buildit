import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

import { createTeam } from "@/lib/actions/team/create-team";

const CreateTeamFormSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters."),
  teamIdentifier: z
    .string()
    .max(5, "Team identifier must be at most 5 characters."),
});

export default function CreateTeamForm({ nextStep }: { nextStep: () => void }) {
  const form = useForm<z.infer<typeof CreateTeamFormSchema>>({
    resolver: zodResolver(CreateTeamFormSchema),
    defaultValues: {
      teamName: "",
      teamIdentifier: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["createTeam"],
    mutationFn: async (values: z.infer<typeof CreateTeamFormSchema>) =>
      createTeam({
        teamName: values.teamName,
        teamIdentifier: values.teamIdentifier,
      }),
    onSuccess: () => {
      nextStep();
    },
    onError: () => {
      toast.error("Error creating team.");
    },
  });
  const onSubmit = (values: z.infer<typeof CreateTeamFormSchema>) => {
    mutation.mutate(values);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}