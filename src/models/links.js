"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Links extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Links.belongsTo(models.Organization);
    }
  }
  Links.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.Enum, allowNull: false },
      organizationId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Links",
    }
  );
  return Links;
};
