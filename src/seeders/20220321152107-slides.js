'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const now = new Date();

    await queryInterface.bulkInsert("Slides", [
      {
        imageUrl: "https://picsum.photos/id/686/1920/600",
        text: "Campaña de nutrición",
        order: 1,
        organizationId: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        imageUrl: "https://picsum.photos/id/1020/1920/600",
        text: "Cuidemos la fauna silvestre",
        order: 3,
        organizationId: 1,
        createdAt: now,
        updatedAt: now
      },
      {
        imageUrl: "https://picsum.photos/id/216/1920/600",
        text: "Campaña aire libre",
        order: 2,
        organizationId: 1,
        createdAt: now,
        updatedAt: now
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => { }
};
