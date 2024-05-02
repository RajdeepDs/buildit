"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@buildit/ui";

import { useAddWorkspaceModal } from "@/components/modals/add-workspace-modal";

export default function WelcomePageClient(): JSX.Element {
  const { setShowAddWorkspaceModal, AddWorkspaceModal } =
    useAddWorkspaceModal();
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (searchParams.get("type") === "workspace") {
      setTimeout(() => {
        setShowAddWorkspaceModal(true);
      }, 200);
    } else {
      setShowAddWorkspaceModal(false);
    }
  }, [searchParams]);
  return (
    <div className="">
      <AddWorkspaceModal />
      {!searchParams.get("type") && (
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold">Buildit</h1>
          <p className="mb-5">Welcome to the app!</p>
          <Button onClick={() => router.push("/welcome?type=workspace")}>
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
}
