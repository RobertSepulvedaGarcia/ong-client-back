const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth')
const authAdminMiddleware = require('../middlewares/authAdmin')
const { deleteNew } = require('../controller/news');
const entries = require('../controller/entries');


//GET the news from the entries model
router.get('', (req, res) => {
  entries
    .find()
    .then((response) => res.status(200).send(response))
    .catch((err) => console.log(err));
});

router.get('/:oid', async function (req, res) {
  const requestedID = req.params.oid;
  const requestedEntry = await entries.findEntryById(requestedID);

  return res.status(200).json({ ok: true, entry: requestedEntry });
});

router.put('/:oid', async function (req, res) {
  const requestedID = req.params.oid;
  let requestedEntry = await entries.findEntryById(requestedID);

  if (requestedEntry !== null) {
    const data = req.body;
    await entries.updateEntryById(requestedID, data);
    requestedEntry = await entries.findEntryById(requestedID);

    return res.status(200).json({ ok: true, entry: requestedEntry });
  }

  return res.status(404).json({ ok: false, error: 'This ID does not exist' });
});

router.post(
  '/',
  authMiddleware,
  authAdminMiddleware,
  body('name').isString().notEmpty().trim().escape(),
  body('content').isString().notEmpty().trim().escape(),
  body('image').isString().notEmpty(),
  body('categoryId').isInt().notEmpty(),
  async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }
    const data = req.body;
    try {
      await entries.createNewsEntry(data);
      return res.status(201).json({ ok: true, msg: 'Created successfully' });
    } catch (e) {
      next(e)
    }
  }
);

router.delete('/:id', deleteNew);

module.exports = router;
