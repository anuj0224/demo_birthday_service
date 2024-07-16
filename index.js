// index.js
const express = require('express');
const checkBirthdaysAndSendReminders = require('./scripts/sendBirthdayReminders');
const Sequelize = require('sequelize');
const config = require('./config/config.json');
const app = express();

// Extract database configuration from config.json
const { database, username, password, host, dialect } = config.development;

// Initialize Sequelize with database configuration
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});

// Example route
app.get('/', (req, res) => {
  res.send('Hello World! This is a birthday email sending Node.js application.');
});

// Start the application
const port = process.env.PORT || 6000;
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);

  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Ensure Sequelize has synchronized all models with the database
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    // Run script for sending birthday reminders
    checkBirthdaysAndSendReminders();
  } catch (error) {
    // If database connection or synchronization fails
    console.error('Unable to connect to the database:', error);

    // Attempt to create the database if it doesn't exist
    try {
      await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
      console.log(`Database '${database}' created successfully.`);
      
      // Retry database connection after creating it
      await sequelize.authenticate();
      console.log('Database connection has been established successfully after creation.');

      // Synchronize models after successful connection
      await sequelize.sync({ alter: true });
      console.log('All models were synchronized successfully after creation.');

      // Run script for sending birthday reminders
      checkBirthdaysAndSendReminders();
    } catch (createError) {
      console.error('Unable to create database or connect:', createError);
    }
  }
});
