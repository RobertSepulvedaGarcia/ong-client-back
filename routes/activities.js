const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const activities = require('../controller/activities');

router.post(
  '/',
  body('name').isString().notEmpty().trim().escape(),
  body('content').isString().notEmpty().trim().escape(),

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({ ok: false, errors: errors.array() });

      const { name, image, content } = req.body;
      await activities.create(name, content, image);

      return res.status(201).json({ ok: true, msg: 'Created successfully' });
    } catch (error) {
      console.log(error.message);
    }
  }
);

module.exports = router;
