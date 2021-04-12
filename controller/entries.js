const sequelize = require('sequelize');
const entries = require('../models').Entries;

// Function to find the entries where type is news
module.exports = {
    find: function(type) {
        return entries
            .findAll({
                where: { type: 'news' },
                attributes: ['id', 'name', 'image', 'createdAt'],
            })
            .then((entries) => {
                return entries;
            });
    },
};