"use strict";
const { faker } = require("@faker-js/faker");
faker.setLocale("es");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();
    const testimonials = [];
    for (let i = 0; i < 60; i++) {
      testimonials.push({
        name: faker.name.firstName() + " " + faker.name.lastName(),
        image: faker.image.avatar(),
        content: faker.lorem.sentence(),
        createdAt: date,
        updatedAt: date
      });
    }
    await queryInterface.bulkInsert("Testimonials", testimonials, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Testimonials", null, {});
  },
};
