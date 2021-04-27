const sequelize = require('sequelize');
const { Categories } = require('../models');

module.exports = {
    createCategory: (name, description) => {
        return Categories
            .create({
                name,
                description
            })
            .then(res => res)
    },
    
    updateCategory: (id, data) => {
        return Categories
            .update(data, {
                where: {id}
            })
            .then(res => res)
    },
    
    find: function() {
        return Categories.findAll().then((categories) => {
            return categories;
        });
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