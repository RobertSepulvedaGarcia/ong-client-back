const { User } = require('../models/index.js');

module.exports = {
    getUserById: function (id) {
        return User.findByPk(id);
    }
};