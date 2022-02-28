'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Entry, {
                foreignKey: 'categoryId'
            });
        }
    };

    Category.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        deletedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Category',
        paranoid: true,
        defaultScope: {
            attributes: {
                exclude: ['deletedAt']
            }
        },
    });

    return Category;

};