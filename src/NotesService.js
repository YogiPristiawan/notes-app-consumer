/* eslint-disable no-tabs */
const { Pool } = require('pg/lib')

class NotesService {
  constructor() {
    this._pool = new Pool({
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || '5432',
      database: process.env.PGDATABASE,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || '',
    })
  }

  async getNotes(userId) {
    const query = {
      text: `SELECT notes.*
			FROM
				notes
			LEFT JOIN collaborations ON collaborations.note_id = notes.id
			WHERE
				notes.owner = $1
			OR
				collaborations.user_id = $1`,
      values: [userId],
    }

    const result = await this._pool.query(query)

    return result.rows
  }
}

module.exports = NotesService
