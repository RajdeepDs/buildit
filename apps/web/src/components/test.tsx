"use client";

import { api } from "@/trpc/react";

export default function Test() {
  const message = api.auth.getSession.useQuery();
  console.log(message.data?.user);

  return (
    <div>
      <h1>{message.data?.user.email}</h1>
    </div>
  );
}
