const sequelize = require('sequelize');
const {Categories} = require('../models');

module.exports = {
    deleteCategory: (id) => {
        return Categories.destroy({
            where: {
                id
            }
        });
    },

    getCategoryById: (id) => {
        return Categories
            .findByPk(id)
            .then(res => res)
    }
}