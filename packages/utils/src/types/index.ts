export interface TUser {
  id: string
  name: string | null
  username: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  bio: string | null
  onboarding: boolean | null
}

export interface TWorkspace {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  userId: string | null
  user?: TUser | null
  teams?: TTeam[] | null
}

export interface TTeam {
  id: string
  name: string
  teamId: string
  issueCounter: number
  createdAt: Date | null
  updatedAt: Date | null
  admin: string
  workspaceId: string | null
  user?: TUser | null
  workspace?: TWorkspace | null
  issue?: TIssue[]
}

export interface TProject {
  id: string
  name: string
  description: unknown | null
  status:
    | 'backlog'
    | 'planned'
    | 'in progress'
    | 'completed'
    | 'canceled'
    | null
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'no priority' | null
  admin: string
  leadId: string | null
  createdAt: Date | null
  updatedAt: Date | null
  teamId: string
  user?: TUser | null
  team?: TTeam | null
  lead?: TUser | null
}

export interface TIssue {
  id: string
  title: string
  description: unknown | null
  status: 'backlog' | 'todo' | 'in progress' | 'done' | 'canceled' | null
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'no priority' | null
  labels: string[] | null
  reporterId: string | null
  assigneeId: string | null
  createdAt: Date | null
  updatedAt: Date | null
  workspaceId: string | null
  issueId: string
  teamId: string | null
  projectId: string | null
  reporter?: TUser | null
  assignee?: TUser | null
  workspace?: TWorkspace | null
  team?: TTeam | null
  project?: TProject | null
}

// export type TIssues = TIssue[];

// export type IssueProp = {
//   id: string;
//   title: string;
//   description: string | null;
//   createdAt: Date | null;
//   updatedAt: Date | null;
//   status: "backlog" | "todo" | "in progress" | "done" | "canceled" | null;
//   priority: "low" | "medium" | "high" | "urgent" | "no priority" | null;
//   reporterId: string | null;
//   assigneeId: string | null;
//   workspaceId: string | null;
//   issueId: string;
// };
