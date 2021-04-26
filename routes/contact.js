const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createContact } = require('../controller/contact');
const { createEmail } = require('../services/mailService');

router.post(
  '/',
  body('email').notEmpty().normalizeEmail(),
  body('name').notEmpty().trim(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, message } = req.body;
    try {
      const result = await createContact({ name, email, phone, message });
      createEmail(
        email,
        'Gracias por completar el formulario!',
        'Sus datos de contacto fueron recibidos',
        'Muchas gracias por completar el formulario, sus datos ahora se encuentran en nuestra base de contactos.'
      );
      res.json({ message: 'Created succsesfully' });
    } catch (e) {
      next(e.message);
    }
  }
);
module.exports = router;
