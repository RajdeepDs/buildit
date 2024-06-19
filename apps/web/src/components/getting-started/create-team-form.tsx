import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const CreateTeamFormSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters"),
});

export default function CreateTeamForm({ nextStep }: { nextStep: () => void }) {
  const form = useForm<z.infer<typeof CreateTeamFormSchema>>({
    resolver: zodResolver(CreateTeamFormSchema),
    defaultValues: {
      teamName: "",
    },
  });
  const onSubmit = (values: z.infer<typeof CreateTeamFormSchema>) => {
    console.log(values);
    nextStep();
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

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
