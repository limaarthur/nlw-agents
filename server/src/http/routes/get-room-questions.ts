import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { desc, eq } from 'drizzle-orm'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { z } from 'zod/v4'

export const getRoomQuestions: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms/:roomId/questions', 
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    }, 
    async (request) => {
      const { roomId } = request.params

      const result = await db
        .select({
          id: schema.questions.id,
          question: schema.questions.id,
          answer: schema.questions.id,
          createdAt: schema.questions.id,
        })
        .from(schema.questions)
        .where(eq(schema.questions.roomId, roomId))
        .orderBy(desc(schema.questions.createdAt))

      return result
    }
  )
}