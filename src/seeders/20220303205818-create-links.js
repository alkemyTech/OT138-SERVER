"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Links",
      [
        {
          name: "Linkedin",
          url: "https://www.linkedin.com/company/alkemy2020/",
          organizationId: process.env.ORGANIZATION_ID,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Instagram",
          url: "https://www.instagram.com/alkemy__/",
          organizationId: process.env.ORGANIZATION_ID,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Facebook",
          url: "https://www.facebook.com/AlkemyLATAM/",
          organizationId: process.env.ORGANIZATION_ID,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Links", null, {});
  },
};
