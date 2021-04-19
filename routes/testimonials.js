const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { createTestimonials } = require('../controller/testimonials');

// Post request for the creation of testimonials in data base 
router.post(
    '/',
    body('name').isString().notEmpty().trim().escape(),
    body('content').isString().notEmpty().trim().escape(),
    body('image').isString().notEmpty(),
    body('id').isInt().notEmpty(),
  
    async function (req, res) {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, errors: errors.array() });
      }
  
      const data = req.body;
      await createTestimonials(data);
  
      return res.status(201).json({ ok: true, msg: 'Created successfully' });
    }
  );

  module.exports = router;