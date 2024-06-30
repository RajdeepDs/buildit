export type TUser = {
  id: string;
  name: string | null;
  username: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  bio: string | null;
  onboarding: boolean | null;
};

export type TTeam = {
  id: string;
  name: string;
  teamId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  admin: string | null;
  workspaceId: string | null;
  user: TUser | null;
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
  id: string;
  title: string;
  description: unknown | null;
  status: "backlog" | "todo" | "in progress" | "done" | "canceled" | null;
  priority: "low" | "medium" | "high" | "urgent" | "no priority" | null;
  reporterId: string | null;
  assigneeId: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  workspaceId: string | null;
  issueId: string;
  teamId: string | null;
  reporter: TUser | null;
};

export type TIssues = TIssue[];

export type Status = {
  value: string;
  label: string;
  icon: string;
};

export type Priority = {
  value: string;
  label: string;
  icon: string;
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

export type TSettingsSidebar = {
  title: string;
  icon?: string;
  items: {
    title: string;
    href?: string;
    icon?: string;
    button?: boolean;
    subItems?: {
      title: string;
      href: string;
    }[];
  }[];
}[];
