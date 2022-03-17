"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Donations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Donations.init(
    {
      id_donation: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      id_mercadopago: DataTypes.STRING,
      message: DataTypes.STRING,
      value: DataTypes.INTEGER,
      date: DataTypes.DATE,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Donations",
    }
  );
  return Donations;
};
