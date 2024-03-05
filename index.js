const { Sequelize } = require("sequelize");
const configBD = require("../config/database.js");

const User = require("../models/User");

const connection = new Sequelize(configBD);
connection
  .sync()
  .then(() => {
    console.log("Deu certo");
  })
  .catch((error) => {
    console.log("OPORRA: "+ error);
  });

User.init(connection);

module.exports = connection;
