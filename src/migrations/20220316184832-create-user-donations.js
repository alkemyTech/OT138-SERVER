"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UserDonations", {
      id_donation: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: "Donations",
          },
          key: "id_donation",
        },
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UserDonations");
  },
};
