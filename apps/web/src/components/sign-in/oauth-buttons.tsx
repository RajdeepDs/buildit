"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { SignInWithOauth } from "@/lib/actions/auth/sign-in-oauth";

export function OauthButton(): JSX.Element {
  const mutation = useMutation({
    mutationKey: ["signInWithOAuth"],
    mutationFn: async (provider: string) => {
      await SignInWithOauth(provider);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex flex-row gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate("github");
        }}
        className="w-full"
      >
        <Button
          variant={"outline"}
          className="w-full space-x-2"
          disabled={mutation.isPending || mutation.isSuccess}
        >
          {mutation.isPending || mutation.isSuccess ? (
            <Icons.loading className="animate-spin" />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 30 30"
              >
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>
            </>
          )}

          <p>GitHub</p>
        </Button>
      </form>
      <form className="w-full">
        <Button
          variant={"outline"}
          className="flex w-full items-center space-x-2"
          disabled={mutation.isPending || mutation.isSuccess}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="18"
            height="18"
            viewBox="0 0 30 30"
          >
            <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
          </svg>

          <p>Google</p>
        </Button>
      </form>
    </div>
  );
}
