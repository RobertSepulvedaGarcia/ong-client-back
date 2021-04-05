const router = require('express').Router();
const organization = require('../controller/organization.js')

//GET petition to get a organization by id
//@rout GET /organizations/:id/public
router.get('/:id/public', async(req, res) => {
    try {
        const organizations = await organization.find(req.params.id).then(r => res.status(200).send(r));

        return res.status(200).json({
            success: true,
            count: organizations.length,
            data: organizations
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

module.exports = router;