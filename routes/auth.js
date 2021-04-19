var express = require('express');
var router = express.Router();
const loginUser = require('../services/authServices');
const validateToken = require('../middlewares/auth');
const jwtSign = require('../services/helpers/jwtSign');
const user = require('../controller/user');

const { body, validationResult } = require('express-validator');

/* Modules */
const bcrypt = require("bcryptjs");
const { getAllUsers } = require('../repositories/userRepository');
const authMiddleware = require('../middlewares/auth');
const authAdminMiddleware = require('../middlewares/authAdmin');

router.get(
  '/me',
  validateToken,
  (req, res) => {
    const { id } = req.user;

    user.getUserById(id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json({ error: err }))
  }
);

router.post(
  '/login',
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty().trim().escape(),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    if (!result) {
      return res.status(409).json({ error: 'Incorrect username or password' });
    }
    if (result.error) {
      return next(result.error);
    }
    const token = jwtSign({
      id: result.id,
      roleId: result.roleId
    });

    return res.status(200).json({ token });
  }
);

/* POST register user */
router.post('/register', body('email').isEmail(), body('password').isLength({ min: 6 }), function (req, res, next) {
  const errors = validationResult(req);
  validate(errors)
  /* Encrypt password for send to BD */
  /* we are driver like a promise, in the finish the encrypt call to create and change the pass for the passhash*/
  hashPassword(req.body.password)
    .then(r => user.create(req.body, req.body.password = r, res))
    .then(r => {

      // after successfull registration, a JWT token gets generated to authenticate user
      const token = jwtSign({
        id: r.id
      });

      res.status(200).json({token});
    })
    .catch(next)
})

/* Function async hash */
async function hashPassword(password) {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash
}

/* Function validate  */
function validate(errors) {
  if (!errors.isEmpty()) {
    if (errors.errors.param == 'email') {
      return res.status(400).send('Email invalido');
    }
    if (errors.errors.param === 'password') {
      return res.status(400).send('Password invalido');
    }
    return res.status(400).json({ errors: errors.array() });
  }
}

/* to login we are use the function compare, I get a example to future login */
/*
  The hash come to BD
  bcrypt.compare(password, passwordHasdeado, (err, coinciden) => {
    if (err) {
      console.log("Error comprobando:", err);
    } else {
      console.log("¿La contraseña coincide?: " + coinciden);
    }
  });
*/

module.exports = router;
