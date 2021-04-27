'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'News',
      [
        {
          name: 'New event',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet gravida.',
          image: 'https://www.unhcr.org/thumb4/5cae07c78.jpg',
          categoryId: 1,
          type: 'event',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'News one',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: 'https://www.unhcr.org/thumb4/5cae07c78.jpg',
          categoryId: 2,
          type: 'news',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'News two',
          content: 'Lorem ipsum dolor sit amet',
          image: 'https://www.unhcr.org/thumb4/5cae07c78.jpg',
          categoryId: 2,
          type: 'news',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('News', null, {});
  },
};
