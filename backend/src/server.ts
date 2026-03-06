import cors from "@fastify/cors"
import dotenv from "dotenv"
import fastify from "fastify"
import { documentRoutes } from "./routes/documentRoutes"

dotenv.config()

const app = fastify()

app.register(cors)
app.register(documentRoutes)

const PORT = Number(process.env.PORT || 3000)

const start = async () => {
  try {
    await app.listen({ port: PORT })
    console.warn(`>> SERVIDOR RODANDO : http://localhost:${PORT}`)

  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()