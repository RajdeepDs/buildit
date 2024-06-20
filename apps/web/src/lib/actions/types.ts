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
  userId: string | null;
}[];
