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

export type TWorkspace =
  | {
      id: string;
      name: string;
      slug: string;
      createdAt: Date | null;
      updatedAt: Date | null;
      issueCounter: number | null;
      userId: string | null;
    }
  | undefined;

export type TIssue = {
  issue;
  id: string;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  title: string;
  status: "backlog" | "todo" | "in progress" | "done" | "canceled" | null;
  priority: "low" | "medium" | "high" | "urgent" | "no priority" | null;
  reporterId: string | null;
  assigneeId: string | null;
  workspaceId: string | null;
  issueId: string;
};

export type TIssues = TIssue[];

export type Status = {
  value: string;
  label: string;
};

export type Priority = {
  value: string;
  label: string;
};

export type IssueProp = {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  status: "backlog" | "todo" | "in progress" | "done" | "canceled" | null;
  priority: "low" | "medium" | "high" | "urgent" | "no priority" | null;
  reporterId: string | null;
  assigneeId: string | null;
  workspaceId: string | null;
  issueId: string;
};
