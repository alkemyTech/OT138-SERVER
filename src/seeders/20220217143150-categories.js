'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'General',
        description: 'Contenido de caracter general',
        createdAt: new Date
      },
      {
        name: 'Actualidad',
        description: 'Últimas novedades',
        createdAt: new Date
      },
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
