var express = require('express');
var router = express.Router();
const loginUser = require('../services/authServices');
const validateToken = require('../middlewares/auth');
const jwtSign = require('../services/helpers/jwtSign');
const User = require('../controller/user');

const { body, validationResult } = require('express-validator');

router.get(
  '/me',
  validateToken,
  (req, res) => {
    const { id } = req.user;

    User.getUserById(id)
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
      return next(error);
    }

    const token = jwtSign({
      id: result.id
    });

    return res.status(200).json({ result });
  }
);

module.exports = router;
