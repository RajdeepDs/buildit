"use client";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { SignInWithOauth } from "@/lib/actions/auth/sign-in-oauth";

export function OauthButton(): JSX.Element {
  const GoogleMutation = useMutation({
    mutationKey: ["signInWithGoogle"],
    mutationFn: async () => {
      await SignInWithOauth("google");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const GitHubMutation = useMutation({
    mutationKey: ["signInWithGitHub"],
    mutationFn: async () => {
      await SignInWithOauth("github");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          GoogleMutation.mutate();
        }}
      >
        <Button
          color={"secondary"}
          className="flex w-full items-center space-x-2"
          disabled={
            GoogleMutation.isPending ||
            GoogleMutation.isSuccess ||
            GitHubMutation.isPending ||
            GitHubMutation.isSuccess
          }
        >
          {GoogleMutation.isPending || GoogleMutation.isSuccess ? (
            <Icons.loading className="animate-spin" />
          ) : (
            <>
              <Image src={"/google.svg"} width={18} height={18} alt="Google" />
            </>
          )}

          <p>Continue with Google</p>
        </Button>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          GitHubMutation.mutate();
        }}
        className="w-full"
      >
        <Button
          color={"secondary"}
          className="w-full space-x-2"
          disabled={
            GitHubMutation.isPending ||
            GitHubMutation.isSuccess ||
            GoogleMutation.isPending ||
            GoogleMutation.isSuccess
          }
        >
          {GitHubMutation.isPending || GitHubMutation.isSuccess ? (
            <Icons.loading className="animate-spin" />
          ) : (
            <>
              <Image src={"/github.svg"} width={18} height={18} alt="GitHub" />
            </>
          )}

          <p>Continue with GitHub</p>
        </Button>
      </form>
    </div>
  );
}
