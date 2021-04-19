var express = require('express');
var router = express.Router();
/* Function of BD */
const user = require('../controller/user.js')

/* Modules */
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const { getAllUsers } = require('../repositories/userRepository');
const authMiddleware = require('../middlewares/auth');
const authAdminMiddleware = require('../middlewares/authAdmin');

router.get('/', authMiddleware, authAdminMiddleware, async (req, res, next) => {
  const userList = await getAllUsers();
  return res.status(200).json(userList);
});

router.delete('/:id', async (req, res) => {
  let { id } = req.params;

  try {
    let checkUser = await user.getUserById(id);

    if (checkUser) {

      if (checkUser.dataValues.deletedAt != null) return res.status(400).json({ error: `User with id: ${id} doesn't exists` });

      await user.deleteUser(id);

      return res.status(200).json({ message: `User with id: ${id} deleted successfully` });
    }

    return res.status(400).json({ error: `User with id: ${id} doesn't exists` });
  } catch (err) {
    res.status(400).json({ error: err });
  }

});

module.exports = router;