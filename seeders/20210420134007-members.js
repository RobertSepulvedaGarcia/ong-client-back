'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {



    await queryInterface.bulkInsert('Members', [{
      name: "John Doe",
      image: "https://www.designevo.com/res/templates/thumb_small/linked-hand-and-community.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
