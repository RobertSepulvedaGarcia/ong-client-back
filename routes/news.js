const express = require('express');
const router = express.Router();
const entries = require('../controller/entries.js');

//GET the news from the entries model
router.get('', (req, res) => {
    entries
        .find()
        .then((response) => res.status(200).send(response))
        .catch((err) => console.log(err));
});

module.exports = router;