import { onboardingRouter } from './routers/getting-started'
import { issuesRouter } from './routers/issues'
import { joinRouter } from './routers/join'
import { projectRouter } from './routers/projects'
import { teamRouter } from './routers/teams'
import { userRouter } from './routers/user'
import { workspaceRouter } from './routers/workspace'
import { createCallerFactory, createRouter } from './trpc'

export const appRouter = createRouter({
  onboarding: onboardingRouter,
  user: userRouter,
  workspace: workspaceRouter,
  team: teamRouter,
  project: projectRouter,
  join: joinRouter,
  issues: issuesRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)

export { createTRPCContext } from './trpc'
