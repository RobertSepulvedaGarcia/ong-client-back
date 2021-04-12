const { User } = require('../models/index.js');

function getUserByEmail(email) {
  return User.findOne({ where: { email } });
}

function getAllUsers() {
  return User.findAll();
}

module.exports = {
  getUserByEmail: getUserByEmail,
  getAllUsers: getAllUsers
}