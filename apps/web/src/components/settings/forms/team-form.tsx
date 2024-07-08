"use client";

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

import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationResult } from "@/lib/actions/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTeamByTeamId } from "@/lib/data/team/get-team-by-teamId";
import { updateTeam } from "@/lib/actions/team/update-team";
import { updateTeamSchema } from "@/schemas/settings";

export default function TeamForm({
  params,
}: { params: { teamId: string } }): JSX.Element {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: team } = useQuery({
    queryKey: ["team", { teamId: params.teamId }],
    queryFn: () => getTeamByTeamId({ teamId: params.teamId }),
  });

  const form = useForm<z.infer<typeof updateTeamSchema>>({
    resolver: zodResolver(updateTeamSchema),
    defaultValues: {
      teamName: "",
      teamIdentifier: "",
    },
  });

  useEffect(() => {
    if (team) {
      form.reset({
        teamName: team.name || "",
        teamIdentifier: team.teamId || "",
      });
    }
  }, [form, team]);

  const mutation = useMutation({
    mutationKey: ["updateTeam", { teamId: params.teamId }],
    mutationFn: async (
      values: z.infer<typeof updateTeamSchema>,
    ): Promise<MutationResult> => {
      return updateTeam({
        id: team?.id || "",
        teamName: values.teamName,
        teamIdentifier: values.teamIdentifier,
      });
    },
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Team updated successfully!");
        setIsSubmitting(false);
      } else {
        toast.error("Error updating team!");
        setIsSubmitting(false);
      }

      router.refresh();
    },
    onError: () => {
      toast.error("Error updating team!");
      setIsSubmitting(false);
    },
  });

  const onSubmit = (values: z.infer<typeof updateTeamSchema>) => {
    setIsSubmitting(true);
    setTimeout(() => {
      mutation.mutate(values);
    }, 500);
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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
