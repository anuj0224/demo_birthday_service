//createDatabase.js

const { Sequelize } = require('sequelize');
const config = require('./config/config.json');

const { database, username, password, host, dialect } = config.development;

async function createDatabase() {
  const sequelize = new Sequelize('', username, password, {
    host: host,
    dialect: dialect,
    logging: false,
  });

  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
    console.log(`Database '${database}' created successfully.`);
  } catch (error) {
    console.error('Unable to create database:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

createDatabase();
