"use strict";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
const basename = path.basename(__filename);

let config = {};

if(process.env.NODE_ENV === 'test') {
    config = require("../config/config").test;
} else if(process.env.NODE_ENV === 'production') {
    config = require("../config/config").production;
} else {
    config = require("../config/config").development;
}

const db = {};
dotenv.config();

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("[DB] La conexión con la Base de Datos fue Exitosa!.");
  } catch (error) {
    console.error("[DB] Imposible Conectar con la Base de Datos:", error);
  }
};
testConnection();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
