"use strict";
const { faker } = require("@faker-js/faker");
faker.setLocale("es");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let seedData = [];
    for (let i = 0; i < 20; i++) {
      //create 20 contacts
      seedData.push({
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        message: i % 3 != 0 ? faker.lorem.sentence() : null, // 1 every 3 will not have a message
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Contacts", seedData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Contacts", null, {});
  },
};
