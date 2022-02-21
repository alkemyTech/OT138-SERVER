"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {

  
  class User extends Model {}
  
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      image:DataTypes.STRING,
      createdAt:DataTypes.STRING,
      updatedAt:DataTypes.STRING,
      deletedAt:DataTypes.STRING
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
