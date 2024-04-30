"use client";

import { startTransition } from "react";
import { useParams } from "next/navigation";
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

import { createIssue } from "@/lib/actions/issue/create-issue";

const formSchema = z.object({
  title: z.string().min(3, "title must be at least 3 characters"),
  description: z.string().min(3, "description must be at least 3 characters"),
});

export default function MyIssuesClient(): JSX.Element {
  const { slug } = useParams() as { slug?: string };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      createIssue({
        title: values.title,
        description: values.description,
        slug: slug || "",
      }).then((data) => {
        if (data.error) {
          console.log(data.error);
          form.reset();
        }
        if (data.success) {
          console.log(data.success);
          form.reset();
        }
      });
    });
  }
  return (
    <div className="">
      <h1 className="font-bold"> My Issues</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Add Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Add Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
