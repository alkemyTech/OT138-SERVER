'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Activities', 'content', {
      type: Sequelize.TEXT
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Activities', 'content', {
      type: Sequelize.STRING
    });
  }
};
