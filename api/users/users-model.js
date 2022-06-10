const db = require('../../data/dbConfig')

async function create(user) {
  const newUser = await db('users').insert(user)
  const users = await findAll()
  const userInfo = users[users.length - 1]
  return userInfo
}

function findAll() {
  return db('users')
    .select('id', 'username')
}

function findById(id) {
  return db('users')
      .select('id', 'username')
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
