import { randomUUID } from "crypto"
import { sql } from "./db.js"

export class DatabasePostgres {
  #certificados = new Map()

  async list(search) {
    let certificados

    if (search) {
      certificados = await sql`select * from certificados where materia ilike ${'%' + search + '%'}`
    } else {
      certificados = await sql`select * from certificados`
    }
    return certificados
  }

  async create(certificado) {
    const certificadoId = randomUUID()

    const {curso, instituicao, data, materia, certificadoimg} = certificado

    await sql `insert into certificados(id, curso, instituicao, materia, data, certificadoimg) VALUES (${certificadoId}, ${curso}, ${instituicao}, ${materia},${data}, ${certificadoimg})`
  }

  async update(id, certificado) {
    const {curso, instituicao, materia, data, certificadoimg} = certificado

    await sql `update certificados set curso = ${curso}, instituicao = ${instituicao}, materia = ${materia}, data = ${data}, certificadoimg = ${certificadoimg} WHERE id = ${id}`
  }

  async delete(id) {
    await sql `delete from certificados where id = ${id}`
  }
}