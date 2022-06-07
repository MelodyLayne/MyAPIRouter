const router = require('express').Router();
const {
  checkNewUser,
  createNewUser,
  validateUser,
  validateToken
} = require('../middleware/auth-middleware')


router.post('/register', checkNewUser, createNewUser,  (req, res, next) => {
  next()
});

router.post('/login', validateUser, validateToken, (req, res, next) => {
    next()
});

module.exports = router;
