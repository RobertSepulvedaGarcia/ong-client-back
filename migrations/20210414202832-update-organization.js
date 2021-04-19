'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return Promise.all([
            await queryInterface.addColumn('Organizations', 'facebook', {
                type: Sequelize.STRING,
            }),
            await queryInterface.addColumn('Organizations', 'linkedIn', {
                type: Sequelize.STRING,
            }),
            await queryInterface.addColumn('Organizations', 'instagram', {
                type: Sequelize.STRING,
            }),
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};