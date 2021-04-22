const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const activity = require('../controller/activities');

router.get('/', async (req, res) => {
  try {
    const activities = await activity.getAll();
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const act = await activity.findOne(id);
    if (!act) {
      return res.status(404).json({ ok: false, error: 'Activity not found' });
    } else {
      return res.status(200).json(act);
    }
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message });
  }
});

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
      await activity.create(name, content, image);

      return res.status(201).json({ ok: true, msg: 'Created successfully' });
    } catch (error) {
      return res.status(400).json({ ok: false, error: error.message });
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
      return res.status(400).json({ ok: false, error: error.message });
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const response = await activity.findOne(id);

    if (!response) {
      return res.status(404).json({ ok: false, error: 'Activity not found' });
    } else {
      await activity.delete(id);
      return res.status(200).json({ ok: true, msg: 'Deleted successfully' });
    }
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message });
  }
});

module.exports = router;
