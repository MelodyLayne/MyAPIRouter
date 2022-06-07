const db = require('../../data/dbConfig')

async function create(user) {
  const [id] = await db('users').insert(user)
  return findById(id)
}

function findAll() {
  return db('users')
}

function findById(id) {
  return db('users')
    .where('id', id)
    .first()
}

function findByUsername(username) {
  return db('users')
    .where({ username })
    .first()
}


module.exports = {
  findAll,
  findById,
  findByUsername,
  create,
}
