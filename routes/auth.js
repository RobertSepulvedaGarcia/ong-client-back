var express = require('express');
var router = express.Router();
const loginUser = require('../services/authServices');

const { body, validationResult } = require('express-validator');

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
    return res.status(200).json(result);
  }
);

module.exports = router;
