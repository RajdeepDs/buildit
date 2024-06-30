"use client";

import { Provider } from "jotai";
import React from "react";

export const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};
