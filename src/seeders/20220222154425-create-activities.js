"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Activities",
      [
        {
          name: "Taller de Arte",
          image:
            "https://theartwolf.com/wp-content/uploads/2021/05/Van_Gogh_-_Starry_-_1920-1080.jpg",
          content: "Taller artístico de la ong",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Apoyo Escolar",
          image:
            "https://c.wallhere.com/photos/45/38/anime_school_Sun-1779177.jpg!d",
          content: "Clases de apoyo complementarias totalmente gratuitas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
