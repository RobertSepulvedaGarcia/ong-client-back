const { User } = require('../models/index.js');

module.exports = {
    getUserById: function (id) {
        return User.findByPk(id);
    },

    deleteUser: function (id) {
        //Get current date in mysql format
        let timeDeleted = new Date().toISOString().slice(0, 19).replace('T', ' ');

        return User.update({ deletedAt: timeDeleted }, {
            where: {
                id
            }
        });
    }

};