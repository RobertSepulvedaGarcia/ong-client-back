const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const activity = require('../controller/activities');

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

router.put(
  '/:id',
  param('id').isInt().notEmpty().trim().escape(),
  body('name').isString().notEmpty().trim().escape(),
  body('content').isString().notEmpty().trim().escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, errors: errors.array() });
      }

      const { id } = req.params;
      const { name, content, image } = req.body;

      const response = await activity.findOne(id);

      if (!response) {
        return res.status(404).json({ ok: false, error: 'Activity not found' });
      } else {
        const edited = await activity.edit(id, name, content, image);
        return res.status(200).json(edited);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

module.exports = router;
