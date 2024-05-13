export type TUser = {
  id: string;
  name: string;
  username: string | null;
  email: string;
  emailVerified: string | null;
  image: string;
  password: string | null;
  onboarding: boolean;
  role: string;
  isTwoFactorEnabled: boolean;
};

export type TWorkspace = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type TIssue = {
  issue;
  id: string;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  title: string;
  status: "open" | "in-progress" | "closed" | null;
  priority: "low" | "medium" | "high" | null;
  reporterId: string | null;
  assigneeId: string | null;
  workspaceId: string | null;
  issueId: string;
};

export type TIssues = TIssue[];
