'use strict';

const { faker } = require("@faker-js/faker");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const news = [];
        for (let i = 0; i < 60; i++) {
            news.push({
                name: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
                image: faker.image.imageUrl(1024, 768, 'arch', true),
                type: 'news',
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }
        await queryInterface.bulkInsert('entries', news, {})
    },

    down: async (queryInterface, Sequelize) => { }
};
