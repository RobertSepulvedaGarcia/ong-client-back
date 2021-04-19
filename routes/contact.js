const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createContact, getAllContacts } = require('../controller/contact')
const authAdminMiddleware = require('../middlewares/authAdmin')
const authMiddleware = require('../middlewares/auth')
router.post('/',
    body('email').notEmpty().normalizeEmail(),
    body('name').notEmpty().trim()
    , async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone, message } = req.body
        try {
            const result = await createContact({ name, email, phone, message })
            res.json({ message: "Created succsesfully" })

        } catch (e) {
            next(e.message)
        }
    });
router.get('/', authMiddleware, authAdminMiddleware, async (req, res, next) => {
    try {
        const contacts = await getAllContacts()
        res.status(200).json(contacts)

    } catch (e) {
        next(e.message)
    }

})
module.exports = router