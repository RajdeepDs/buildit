import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { db, eq } from '@buildit/db'
import { issueTable, teamTable, workspaceTable } from '@buildit/db/schema'
import { CreateIssueInputSchema } from '@buildit/utils/validations'

import { createRouter, protectedProcedure } from '../trpc'

const getWorkspace = async (userId: string) => {
  return db.query.workspaceTable.findFirst({
    where: eq(workspaceTable.userId, userId),
  })
}

const getTeam = async (id: string) => {
  return await db.query.teamTable.findFirst({
    where: eq(teamTable.id, id),
    columns: {
      teamId: true,
      issueCounter: true,
    },
  })
}

const getTeamByTeamId = async (teamId: string) => {
  return await db.query.teamTable.findFirst({
    where: eq(teamTable.teamId, teamId),
    columns: {
      id: true,
    },
  })
}

const generateIssueId = (team: { teamId: string; issueCounter: number }) => {
  return `${team.teamId}-${(team.issueCounter + 1).toString()}`
}

export const issuesRouter = createRouter({
  get_issues: protectedProcedure.query(async ({ ctx }) => {
    const workspace = await getWorkspace(ctx.user.id)

    if (!workspace) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Workspace not found',
        cause: 'The user does not have a workspace',
      })
    }

    const issues = await db.query.issueTable.findMany({
      where: eq(issueTable.workspaceId, workspace.id),
      with: {
        assignee: true,
      },
    })

    return issues
  }),

  get_issues_by_team: protectedProcedure
    .input(z.object({ teamId: z.string() }))
    .query(async ({ ctx, input }) => {
      const workspace = await getWorkspace(ctx.user.id)

      if (!workspace) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Workspace not found',
          cause: 'The user does not have a workspace',
        })
      }

      const issues = await db.query.issueTable.findMany({
        where: eq(issueTable.workspaceId, workspace.id),
        with: {
          assignee: true,
        },
      })

      const team = await getTeamByTeamId(input.teamId)

      if (!team) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Team not found',
          cause: 'The team does not exist',
        })
      }

      return issues.filter((issue) => issue.teamId === team.id)
    }),

  create_issue: protectedProcedure
    .input(CreateIssueInputSchema)
    .mutation(async ({ ctx, input }) => {
      const workspace = await getWorkspace(ctx.user.id)

      const team = await getTeam(input.teamId)

      if (!workspace) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Workspace not found',
          cause: 'The user does not have a workspace',
        })
      }

      if (!team) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Team not found',
          cause: 'The team does not exist',
        })
      }

      const issueId = generateIssueId(team)

      await db.insert(issueTable).values({
        title: input.title,
        description: input.description,
        status: input.status,
        priority: input.priority,
        teamId: input.teamId,
        assigneeId: input.assigneeId === '' ? null : (input.assigneeId ?? null),
        projectId: input.projectId === '' ? null : (input.projectId ?? null),
        issueId: issueId,
        reporterId: ctx.user.id,
        workspaceId: workspace.id,
      })

      await db
        .update(teamTable)
        .set({ issueCounter: team.issueCounter + 1 })
        .where(eq(teamTable.id, input.teamId))

      return {
        message: `${issueId} - ${input.title}`,
      }
    }),
})
