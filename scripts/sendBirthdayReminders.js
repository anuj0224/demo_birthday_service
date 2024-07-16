const cron = require('node-cron');
const { Op } = require('sequelize');
const User = require('../models/user'); // Adjust path as per your project structure
const { transporter } = require('../config/mailer');
const Sequelize = require('sequelize'); // Assuming you have a Sequelize instance configured

const checkBirthdaysAndSendReminders = async () => {
  try {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1; // Months are zero-indexed

    // Find users with a birthday today
    const usersWithBirthdayToday = await User.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('dob')), todayMonth),
          Sequelize.where(Sequelize.fn('DAY', Sequelize.col('dob')), todayDay)
        ]
      }
    });

    // Iterate over each user with a birthday
    for (const user of usersWithBirthdayToday) {
      // Send a happy birthday email to the user themselves
      const birthdayMailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Happy Birthday!',
        text: `Dear ${user.name},\n\nHappy Birthday! We hope you have a fantastic day filled with joy and celebration.\n\nBest wishes,\nYour Team`,
      };

      transporter.sendMail(birthdayMailOptions, (error, info) => {
        if (error) {
          console.error('Error sending birthday email to user:', error.message);
        } else {
          console.log(`Birthday email sent to ${user.name}`);
        }
      });

      // Find all other users to send birthday reminders
      const usersExceptCurrent = await User.findAll({
        where: {
          id: { [Op.not]: user.id }
        }
      });

      // Send reminder emails to colleagues
      usersExceptCurrent.forEach((colleague) => {
        const mailOptions = {
          from: process.env.EMAIL,
          to: colleague.email,
          subject: 'Birthday Reminder',
          text: `Dear ${colleague.name},\n\nToday is ${user.name}'s birthday! Don't forget to wish them a fantastic day.\n\nBest regards,\nYour Team`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error.message);
          } else {
            console.log(`Reminder email sent to ${colleague.name}`);
          }
        });
      });
    }

    console.log('Birthday reminders processed successfully');
  } catch (error) {
    console.error('Error processing birthday reminders:', error);
  }
};

// Schedule the function to run daily at 6:00 AM
cron.schedule('0 6 * * *', () => {
  checkBirthdaysAndSendReminders();
});

module.exports = checkBirthdaysAndSendReminders;