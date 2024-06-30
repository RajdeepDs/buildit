"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { BlockEditor } from "@buildit/editor";
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@buildit/ui";

import { priorities, statuses } from "@/configs/issue-types";
import { createIssue } from "@/lib/actions/issue/create-issue";
import { getTeams } from "@/lib/data/team/get-teams";
import { CreateIssueSchema } from "@/schemas/issue";

export default function CreateIssueForm({
	onOpenChange,
}: {
	onOpenChange: (isOpen: boolean) => void;
}): JSX.Element {
	const { slug } = useParams() as { slug?: string };

	const { data: team } = useQuery({
		queryKey: ["team"],
		queryFn: async () => getTeams(),
	});

	const form = useForm<z.infer<typeof CreateIssueSchema>>({
		resolver: zodResolver(CreateIssueSchema),
		defaultValues: {
			title: "",
			description: "",
			status: "backlog",
			priority: "no priority",
		},
	});

	const mutation = useMutation({
		mutationKey: ["createIssue", { slug }],
		mutationFn: (values: z.infer<typeof CreateIssueSchema>) =>
			createIssue({
				title: values.title,
				description: JSON.parse(JSON.stringify(values.description)),
				status: values.status,
				priority: values.priority,
				slug: slug,
				teamId: team?.id,
			}),
		onSuccess: (res) => {
			if (res.success) {
				toast.success("Issue created", {
					description: `${res.success} created successfully.`,
				});
			} else {
				toast.error("Error creating issue");
			}
			onOpenChange(false);
		},
		onError: () => {
			toast.error("Error creating issue");
		},
	});

	const onSubmit = (values: z.infer<typeof CreateIssueSchema>) => {
		if (slug && team) {
			mutation.mutate(values);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Title"
									{...field}
									className="border-none px-0 text-lg font-semibold shadow-none placeholder:text-gray-500 focus-visible:ring-0"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={() => (
						<FormItem className="max-h-[400px] overflow-y-auto">
							<FormControl>
								<BlockEditor control={form.control} name="description" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-x-2">
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{statuses.map((status) => (
											<SelectItem key={status.value} value={status.value}>
												{status.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="priority"
						render={({ field }) => (
							<FormItem>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Priority" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{priorities.map((priority) => (
											<SelectItem key={priority.value} value={priority.value}>
												{priority.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
