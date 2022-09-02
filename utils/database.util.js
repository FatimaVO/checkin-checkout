const { Sequelize, DataTypes } = require('sequelize');

//Establish data base conection
const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'Fvo311993',
  port: 5432,
  database: 'checkinCheckout',
  logging: false,
});

module.exports = { db, DataTypes };
