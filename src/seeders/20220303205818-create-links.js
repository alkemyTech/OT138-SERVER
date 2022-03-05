'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Links', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});

  },

  down: async (queryInterface, Sequelize) => {
await queryInterface.bulkDelete('Links', null, {});

  }
};
