import { TRPCError } from '@trpc/server'

import { db, eq } from '@buildit/db'
import { projectTable } from '@buildit/db/schema'
import {
  CreateProjectSchema,
  DeleteProjectSchema,
} from '@buildit/utils/validations'

import { createRouter, protectedProcedure } from '../trpc'

export const projectRouter = createRouter({
  get_projects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await db.query.projectTable.findMany({
      where: eq(projectTable.admin, ctx.user.id),
      with: {
        user: true,
      },
    })
    return projects
  }),
  create_project: protectedProcedure
    .input(CreateProjectSchema)
    .mutation(async ({ input, ctx }) => {
      if (!input.teamId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Team ID is required',
        })
      }
      await db.insert(projectTable).values({
        name: input.projectName,
        teamId: input.teamId,
        admin: ctx.user.id,
      })
      return { message: 'Project created successfully' }
    }),
  delete_project: protectedProcedure
    .input(DeleteProjectSchema)
    .mutation(async ({ input }) => {
      await db.delete(projectTable).where(eq(projectTable.id, input.projectId))
      return { message: 'Project deleted successfully' }
    }),
})
