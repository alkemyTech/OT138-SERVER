'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {

    static associate(models) {
      Entry.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        onDelete: 'SET NULL'
      })
    }
  };

  Entry.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Entry',
    paranoid: true
  });
  return Entry;
};