const sequelize = require('sequelize');
const { Categories } = require('../models');

module.exports = {
    find: function() {
        return Categories.findAll().then((categories) => {
            return categories;
        });
    },
    updateCategory: (id, data) => {
        return Categories.update(data, {
            where: { id },
        }).then((res) => res);
    },

    deleteCategory: (id) => {
        return Categories.destroy({
            where: {
                id,
            },
        });
    },

    getCategoryById: (id) => {
        return Categories.findByPk(id).then((res) => res);
    },
};