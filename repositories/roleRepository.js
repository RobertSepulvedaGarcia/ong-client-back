const { Role } = require('../models/index.js');

function getRoleById(id) {
  return Role.findOne({ where: { id } });
}

module.exports = getRoleById;
