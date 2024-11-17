import { TRPCError } from '@trpc/server'

import { db, eq } from '@buildit/db'
import { projectTable } from '@buildit/db/schema'
import {
  CreateProjectInputSchema,
  DeleteProjectSchema,
  UpdateProjectPropertiesSchema,
} from '@buildit/utils/validations'

import { createRouter, protectedProcedure } from '../trpc'

export const projectRouter = createRouter({
  get_projects: protectedProcedure.query(async ({ ctx }) => {
    const projects = await db.query.projectTable.findMany({
      where: eq(projectTable.admin, ctx.user.id),
      with: {
        user: true,
        lead: true,
        team: true,
      },
    })
    return projects
  }),
  create_project: protectedProcedure
    .input(CreateProjectInputSchema)
    .mutation(async ({ input, ctx }) => {
      if (!input.teamId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Team ID is required',
        })
      }

      await db.insert(projectTable).values({
        name: input.name,
        description: input.description,
        status: input.status,
        priority: input.priority,
        leadId: input.leadId === '' ? null : (input.leadId ?? null),
        teamId: input.teamId,
        admin: ctx.user.id,
      })

      return { message: 'Project created successfully' }
    }),
  update_project_properties: protectedProcedure
    .input(UpdateProjectPropertiesSchema)
    .mutation(async ({ input }) => {
      const { id, ...properties } = input

      // Filter out undefined fields to handle partial updates
      const filteredUpdates = Object.fromEntries(
        Object.entries(properties).filter(([_, value]) => value !== undefined),
      )

      await db
        .update(projectTable)
        .set(filteredUpdates)
        .where(eq(projectTable.id, id))

      return { message: 'Project updated successfully.' }
    }),
  delete_project: protectedProcedure
    .input(DeleteProjectSchema)
    .mutation(async ({ input }) => {
      await db.delete(projectTable).where(eq(projectTable.id, input.projectId))
      return { message: 'Project deleted successfully' }
    }),
})
