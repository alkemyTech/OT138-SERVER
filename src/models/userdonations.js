"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserDonations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserDonations.belongsTo(models.Donations, { foreignKey: "id_donation" });
      UserDonations.belongsTo(models.User, { foreignKey: "id_user" });
    }
  }
  UserDonations.init(
    {
      id_donation: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Donations",
          key: "id_donation",
        },
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "UserDonations",
    }
  );
  return UserDonations;
};
