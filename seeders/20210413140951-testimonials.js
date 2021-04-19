'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Testimonials', [
      {
        name: 'Demo Testimonials',
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non leo ac diam tristique auctor nec et purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Testimonials', null, {});
  },
};
