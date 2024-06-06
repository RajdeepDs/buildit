"use client";

import React from "react";
import { Provider } from "jotai";

export const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};
