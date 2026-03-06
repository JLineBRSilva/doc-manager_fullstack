import type { FastifyInstance } from "fastify";
import { documentService } from "../services/documentService";

export async function documentRoutes(app: FastifyInstance) {

  app.post("/documents", async (request, reply) => {
    try {
      const data = request.body
      const doc = await documentService.create(data)
      return reply.status(201).send(doc)
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  })


  app.get("/documents", async () => {
    return documentService.list()
  })


  app.patch("/documents/:id/status", async (request, reply) => {
    try {
      const { id } = request.params as any
      const status: any = request.body

      const updated = await documentService.updateStatus(id, status)
      return updated
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  })


  app.delete("/documents/:id", async (request, reply) => {
    try {
      const { id } = request.params as any
      await documentService.delete(id)
      return reply.status(204).send()
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  })
}