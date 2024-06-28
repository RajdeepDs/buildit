import type { TWorkspace } from "@/types";

export interface MutationResult {
  success?: string;
  error?: string;
}

export type CreateTeamResponse = {
  id: string;
  name: string;
  teamId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  workspaceId: string | null;
  admin: string | null;
}[];

export type WorkspaceResponse = TWorkspace[];
