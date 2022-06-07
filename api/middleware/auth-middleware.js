const User = require('../users/users-model')
const { JWT_SECRET } = require("../secrets");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const checkNewUser = async (req, res, next) => {
  const { username } = req.body
  const user = await User.findByUsername(username)

  user
    ? next({message: 'username taken',  status: 401 })
    : next()
}

const createNewUser = async (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)
  const user = { username, password: hash }
  try {
    const newUser = await User.create(user)
    res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
}

const validateUser = async (req, res, next) => {

  const { username, password } = req.body
  const user = await User.findByUsername(username)

  !user
    ? next({ status: 401, message: 'invalid credentials' })
    : req.user = user

  !username || !password
    ? next({ status: 401, message: 'username and password required' })
    : next()
}

const validateToken = (req, res, next) => {
  const user = req.user
  const { username, password } = req.body
  console.log(user)
  const credentials = bcrypt.compareSync(password, user.password)

  function createToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
    }
    const options = {
      expiresIn: '1d',
    }
    return jwt.sign(payload, JWT_SECRET, options)
  }

  !username || !credentials
    ? next({ status: 401, message: 'username and password required' })
    : next({
      status: 200,
      message: `welcome, ${username}`,
      token: createToken(username),
    })
}


module.exports = {
  checkNewUser,
  createNewUser,
  validateUser,
  validateToken
}
