const express = require('express');
const router = express.Router();
const categories = require('../controller/categories');
const { body, validationResult, param } = require('express-validator');
const authAdminMiddleware = require('../middlewares/authAdmin');
const authMiddleware = require('../middlewares/auth');

router.delete('/:id',
    authMiddleware, 
    authAdminMiddleware,
    param('id').notEmpty().isInt(),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.params;

        try {
            let checkCategory = await categories.getCategoryById(id);

            if(checkCategory){
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

module.exports = router;