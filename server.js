import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
import fastifyCors from 'fastify-cors' // Importe o pacote fastify-cors

const server = fastify()

const database = new DatabasePostgres()

// Registre o plugin fastify-cors
server.register(fastifyCors, {
  // Configuração do CORS
  origin: '*' // Defina as origens permitidas, ou '*' para permitir todas as origens
})

server.post("/certificados", async (request, reply) => {
  const { curso, instituicao, materia, data, certificadoimg } = request.body
  await database.create({
    curso,
    instituicao,
    materia,
    data,
    certificadoimg
  })
  return reply.status(201).send()
})

server.get("/certificados", async (request) => {
  const search = request.query.search
  const certificados = await database.list(search)
  return certificados
})

server.put("/certificados/:id", async (request, reply) => {
  const certificadoId = request.params.id
  const { curso, instituicao, materia, data, certificadoimg } = request.body
  await database.update(certificadoId, {
    curso,
    instituicao,
    materia,
    data,
    certificadoimg
  })
  return reply.status(204).send()
})

server.delete("/certificados/:id", (request, reply) => {
  const certificadoId = request.params.id
  database.delete(certificadoId)
  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})
