// index.js
const express = require('express');
const checkBirthdaysAndSendReminders = require('./scripts/sendBirthdayReminders');
const Sequelize = require('sequelize');
const config = require('./config/config.json');
const seedDatabase = require('./seeders/seed');
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
  res.send('Hello World! this is birthday email sending nodejs application.......... ');
});

// Start the application
async function startApp() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Ensure Sequelize has synchronized all models with the database
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    // Seed the database
    await seedDatabase();
    console.log('Database seeding completed.');

    // Run script for sending birthday reminders
    checkBirthdaysAndSendReminders();

    // Start the Express server
    const port = process.env.PORT || 6000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    // If database connection or synchronization fails
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startApp();
