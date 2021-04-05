'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Slides', [
      {
        imageUrl: 'https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-3c81dfaa-257e-42bc-9f90-b2bf458b9057.jpg',
        text: 'First test slide text',
        order: 1,
        organizationId: 1
      },
      {
        imageUrl: 'https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-c7f2cba8-5899-4370-998a-ad9aaff8fbd2.jpg',
        text: 'Second test slide text',
        order: 2,
        organizationId: 1
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
