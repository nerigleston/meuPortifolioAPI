import { fastify } from 'fastify';
import fastifyCors from 'fastify-cors'; // Importe o pacote fastify-cors
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

const database = new DatabasePostgres();

// Registre o plugin fastify-cors com o curinga '*' como origem permitida (atenção à segurança)
server.register(fastifyCors, {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE', // Configure os métodos permitidos
  credentials: true, // Permitir cookies e credenciais (se necessário)
});

server.post("/certificados", async (request, reply) => {
  const { curso, instituicao, materia, data, certificadoImg } = request.body;

  await database.create({
    curso,
    instituicao,
    materia,
    data,
    certificadoImg,
  });

  return reply.status(201).send();
});

server.get("/certificados", async (request) => {
  const search = request.query.search;

  const certificados = await database.list(search);

  return certificados;
});

server.put("/certificados/:id", async (request, reply) => {
  const certificadoId = request.params.id;
  const { curso, instituicao, materia, data, certificadoImg } = request.body;

  await database.update(certificadoId, {
    curso,
    instituicao,
    materia,
    data,
    certificadoImg,
  });

  return reply.status(204).send();
});

server.delete("/certificados/:id", (request, reply) => {
  const certificadoId = request.params.id;

  database.delete(certificadoId);

  return reply.status(204).send();
});

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
});
