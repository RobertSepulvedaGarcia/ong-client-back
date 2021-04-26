'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [    {
      firstName: 'Gustavo',
      lastName: 'Alter',
      email: 'Gustavo@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 1,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Jack',
      lastName: 'Brown',
      email: 'Jack@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 1,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Peter',
      lastName: 'Griffin',
      email: 'Peter@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 1,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Fabricio',
      lastName: 'Alcaraz',
      email: 'Fabricio@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 1,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Victoria',
      lastName: 'Mendez',
      email: 'Victoria@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 1,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Celeste',
      lastName: 'Billordo',
      email: 'Celeste@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 1,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Rick',
      lastName: 'Sanchez',
      email: 'Rick@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 1,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Sergio',
      lastName: 'Merlo',
      email: 'Sergio@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 1,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Esteban',
      lastName: 'Morales',
      email: 'Esteban@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 1,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'David',
      lastName: 'Alter',
      email: 'David@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 1,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  //User rol ID 2
  {
      firstName: 'Victor',
      lastName: 'Mendieta',
      email: 'Victor@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 2,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Luis',
      lastName: 'Brown',
      email: 'Luis@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 2,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Homer',
      lastName: 'Simpson',
      email: 'Homer@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 2,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Ignacion',
      lastName: 'Gomez',
      email: 'Ignacion@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 2,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Antonela',
      lastName: 'Mendez',
      email: 'Antonela@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 2,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Virginia',
      lastName: 'Curie',
      email: 'Virginia@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 2,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Selene',
      lastName: 'Bubles',
      email: 'Selene@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 2,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Clarisa',
      lastName: 'Merlo',
      email: 'Clarisa@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 2,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Genaro',
      lastName: 'Morales',
      email: 'Genaro@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 2,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  },
  {
      firstName: 'Hector',
      lastName: 'Alter',
      email: 'Hector@test.com',
      // Important: Password not encrypted yet! 
      password: '$2b$10$CO4FJCSv3mdDleo0m41vaeXG5AZOcyVx2QiSmsTZdi/IQZWB.lG06',
      roleId: 2,
      image: 'https://ibb.co/syBgspv',
      createdAt: new Date,
      updatedAt: new Date
  }
    ], {});
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
