const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { getAllMembemres, createMember } = require('../controller/members')

router.get('/', async (req, res, next) => {
    try {
        const result = await getAllMembemres()
        res.status(200).json(result)
    } catch (e) { next(e) }

})
router.post('/', body("name").notEmpty().isString(), body("image").isString(), async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, image } = req.body
        const result = await createMember({ name, image })
        if (result) {
            return res.status(201).json({ message: 'Created Successfully' })
        }


    } catch (e) { next(e) }



})

module.exports = router