const express = require('express');
const checkBirthdaysAndSendReminders  = require('./scripts/sendBirthdayReminders');
const Sequelize = require('sequelize') // Adjust path as per your project structure
const sequelize = new Sequelize(require('./config/config.json').development);
const app = express();

// Example route
app.get('/', (req, res) => {
  res.send('Hello World! this is birthday email sending nodejs application.......... ');
});

// Start the application
const port = process.env.PORT || 6000;
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);

  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Ensure Sequelize has synchronized all models with the database
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    // Run script for sending birthday reminders
    checkBirthdaysAndSendReminders();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
