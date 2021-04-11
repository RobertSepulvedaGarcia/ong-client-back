const { User } = require('../models/index.js');

function getUserByEmail(email) {
  return User.findOne({ where: { email } });
}

module.exports = getUserByEmail;