"use strict";
const { faker } = require("@faker-js/faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const testimonials = [];
    for (let i = 0; i < 60; i++) {
      testimonials.push({
        name: faker.lorem.sentence(),
        image: faker.image.imageUrl(1024, 768, "arch", true),
        content: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Testimonials", testimonials, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Testimonials", null, {});
  },
};
