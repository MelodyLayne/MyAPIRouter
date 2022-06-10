const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../secrets"); // use this secret!

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  !token
    ? next({ status: 401, message: 'Token required' })
    : jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      err
        ? next({ status: 401, message: 'Token invalid' })
        : req.decodedToken = decodedToken
      next()
    })
};
