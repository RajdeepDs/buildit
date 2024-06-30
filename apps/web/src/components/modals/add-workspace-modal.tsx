import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "@sindresorhus/slugify";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { startTransition, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  FixedModal as Modal,
  Separator,
} from "@buildit/ui";

import { createWorkspace } from "@/lib/actions/workspace/create-workspace";

const formSchema = z.object({
  workspaceName: z
    .string()
    .min(3, "Workspace name must be at least 3 characters"),
  workspaceSlug: z
    .string()
    .min(3, "Workspace name must be at least 3 characters"),
});

function AddWorkspaceModalHelper({
  showAddWorkspaceModal,
  setShowAddWorkspaceModal,
}: {
  showAddWorkspaceModal: boolean;
  setShowAddWorkspaceModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceName: "",
      workspaceSlug: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      createWorkspace({
        name: values.workspaceName,
        slug: values.workspaceSlug,
        // TODO: Add types for data
      }).then((data: any) => {
        if (data.error) {
          toast.error("Error creating workspace.");
        }
        if (data.success) {
          toast.success("Workspace created successfully.");
          setShowAddWorkspaceModal(false);
          router.push(`/${values.workspaceSlug}`);
        }
      });
    });
  }
  return (
    <Modal
      showModal={showAddWorkspaceModal}
      setShowModal={setShowAddWorkspaceModal}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="p-5 text-center">
          <h1 className="text-xl font-semibold">Add Workspace</h1>
          <p>Add a new workspace to your account.</p>
        </div>
        <Separator />
        <div className="w-full bg-gray-200/20 p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="workspaceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
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
                    <FormLabel>Workspace Slug</FormLabel>
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
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export function useAddWorkspaceModal() {
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false);

  const AddWorkspaceModal = useCallback(() => {
    return (
      <AddWorkspaceModalHelper
        showAddWorkspaceModal={showAddWorkspaceModal}
        setShowAddWorkspaceModal={setShowAddWorkspaceModal}
      />
    );
  }, [showAddWorkspaceModal, setShowAddWorkspaceModal]);

  return useMemo(
    () => ({ setShowAddWorkspaceModal, AddWorkspaceModal }),
    [setShowAddWorkspaceModal, AddWorkspaceModal],
  );
}
