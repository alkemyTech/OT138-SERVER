"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, { as: "role" });
      User.hasMany(models.UserDonations, { foreignKey: "id_user" });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["password", "deletedAt"],
        },
      },
      paranoid: true,
    }
  );
  return User;
};
