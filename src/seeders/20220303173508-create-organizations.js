"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert(
      "Organizations",
      [
        {
          name: "Somos Más ONG",
          image: `${process.env.FRONTEND_URL}/logo.png`,
          phone: "+54 11 4876 2158",
          address: "Cabildo 1234, CABA, Buenos Aires, Argentina",
          welcomeText: "Bienvenidos a Somos Más ONG",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Organizations", null, {});
  },
};
