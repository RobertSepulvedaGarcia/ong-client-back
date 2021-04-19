'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Organizations', [{
                    name: 'My Organization',
                    image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
                    phone: 123456123,
                    address: 'My Address',
                    welcomeText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non leo ac diam tristique auctor nec et purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'My Organization two',
                    image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
                    phone: 87654321,
                    address: 'My Address two',
                    welcomeText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non leo ac diam tristique auctor',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    facebook: 'https://www.facebook.com/',
                    linkedIn: 'https://www.linkedin.com/',
                    instagram: 'https://www.instagram.com/',
                },
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};