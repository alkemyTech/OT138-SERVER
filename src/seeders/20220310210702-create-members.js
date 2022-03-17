"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const members = [];
    for (let i = 0; i < 10; i++) {
      members.push({
        name: faker.name.firstName() + " " + faker.name.lastName(),
        image: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    console.log("seed");
    await queryInterface.bulkInsert("Members", members, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Members", null, {});
  },
};
