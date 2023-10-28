import { randomUUID } from "crypto"
import { sql } from "./db.js"

export class DatabasePostgres {
  #certificados = new Map()

  async list(search) {
    let certificados

    if (search) {
      certificados = await sql`select * from certificados where curso ilike ${'%' + search + '%'}`
    } else {
      certificados = await sql`select * from certificados`
    }
    return certificados
  }

  async create(certificado) {
    const certificadoId = randomUUID()

    const {curso, instituicao, data, materia, certificadoImg} = certificado

    await sql `insert into certificados(id, curso, instituicao, materia, data, certificadoImg) VALUES (${certificadoId}, ${curso}, ${instituicao}, ${materia},${data}, ${certificadoImg})`
  }

  async update(id, certificado) {
    const {curso, instituicao, materia, data, certificadoImg} = certificado

    await sql `update certificados set curso = ${curso}, instituicao = ${instituicao}, materia = ${materia}, data = ${data}, certificadoImg = ${certificadoImg} WHERE id = ${id}`
  }

  async delete(id) {
    await sql `delete from certificados where id = ${id}`
  }
}