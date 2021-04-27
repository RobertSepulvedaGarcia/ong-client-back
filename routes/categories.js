const express = require('express');
const router = express.Router();
const categories = require('../controller/categories');
const { body, validationResult, param } = require('express-validator');
const authAdminMiddleware = require('../middlewares/authAdmin');
const authMiddleware = require('../middlewares/auth');

router.get('', (req, res) => {
    categories
        .find()
        .then((response) => res.status(200).send(response))
        .catch((err) => console.log(err));
});

router.delete(
    '/:id',
    authMiddleware,
    authAdminMiddleware,
    param('id').notEmpty().isInt(),
    async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;

        try {
            let checkCategory = await categories.getCategoryById(id);

            if (checkCategory) {
                await categories.deleteCategory(id);

                return res.status(200).json({
                    message: `Category with id: ${id} deleted successfully`,
                });
            }
        
            return res.status(400).json({ error: `Category with id: ${id} doesn't exists` });
        } catch (e) {
            next(e.message);
        }
});

router.put(
    '/:id',
    authMiddleware,
    authAdminMiddleware,
    param('id').notEmpty().isInt(),
    body('name').notEmpty().isString().trim(),
    async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { name, description } = req.body;

        try {
            let checkCategory = await categories.getCategoryById(id);
            if (!checkCategory)
                return res.status(400).json({
                    error: `Category with id: ${id} does not exists`,
                });

            await categories.updateCategory(id, {
                name,
                description,
                // updatedAt with current date in mysql format
                updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            });

            return res.status(200).json({
                message: `Category with id: ${id} updated successfully`,
            });
        } catch (e) {
            next(e.message);
        }
    }
);

router.post('/',
    authMiddleware,
    authAdminMiddleware,
    body('name').notEmpty().isString().trim(), 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {name, description} = req.body;

        categories.createCategory(name, description)
            .then(r => res.status(200).json({
                message: "Category created successfully",
                newCategory: r
            }))
            .catch(err => next(err.message));
});

module.exports = router;