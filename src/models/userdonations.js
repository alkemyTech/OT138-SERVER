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
      // define association here
    }
  }
  UserDonations.init(
    {
      id_donation: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserDonations",
    }
  );
  return UserDonations;
};
