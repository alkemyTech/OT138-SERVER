"use strict";

const { faker } = require("@faker-js/faker");
faker.setLocale("es");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();
    const members = [
      {
        name: 'Andrea Becerra',
        image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/712.jpg',
        area: 'Tesorera',
        createdAt: date,
        updatedAt: date
      },
      {
        name: 'Rubén Ramírez',
        image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/87.jpg',
        area: 'Presidente',
        createdAt: date,
        updatedAt: date
      },
      {
        name: 'Laura Salazar',
        image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/544.jpg',
        area: 'Vice presidente',
        createdAt: date,
        updatedAt: date
      },
      {
        name: 'Ángela Pineda',
        image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/861.jpg',
        area: 'Relaciones públicas',
        createdAt: date,
        updatedAt: date
      },
      {
        name: 'Lorena García',
        image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/751.jpg',
        area: 'Coordinadora',
        createdAt: date,
        updatedAt: date
      },
      {
        name: 'Salvador Suárez',
        image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1118.jpg',
        area: 'Dirección',
        createdAt: date,
        updatedAt: date
      },
      {
        name: 'Pablo Gonzalez',
        image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/734.jpg',
        area: 'Vocal',
        createdAt: date,
        updatedAt: date
      },
      {
        name: 'Jorge Dueñas',
        image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/847.jpg',
        area: 'Secretario',
        createdAt: date,
        updatedAt: date
      },
      {
        name: 'Pedro Sánchez',
        image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/994.jpg',
        area: 'Vocal',
        createdAt: date,
        updatedAt: date
      },
      {
        name: 'Daniel Rivas',
        image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1043.jpg',
        area: 'Consultor técnico',
        createdAt: date,
        updatedAt: date
      }
    ];
    await queryInterface.bulkInsert("Members", members, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Members", null, {});
  },
};
