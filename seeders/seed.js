// seeders/seed.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize(require('../config/config.json').development); // Replace with your environment

// Import your Sequelize model(s)
const User = require('../models/user'); // Adjust the path as per your actual model location

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Sync the User model (ensure it's defined in your models)
    await User.sync({ force: true }); // Use force: true to drop table if exists and re-create it
    
    // Check if there are any existing users
    const existingUsers = await User.findAll();
    if (existingUsers.length > 0) {
      console.log('Database is already seeded. Skipping seeding process.');
      return;
    }

    // Example user data to seed
    const users = [
        {
          username: 'admin',
          email: 'mouryaanuj2002@gmail.com',
          dob: '1990-01-01', // Example date of birth
        },
        {
          username: 'john_doe',
          email: 'kanv@etaipl.in',
          dob: '1985-07-17', // Example date of birth
        },
        {
          username: 'jane_smith',
          email: 'jane.smith@example.com',
          dob: '1988-11-20', // Example date of birth
        },
        {
          username: 'mike_jones',
          email: 'mike.jones@example.com',
          dob: '1992-09-30', // Example date of birth
        },
        {
          username: 'sara_wilson',
          email: 'sara.wilson@example.com',
          dob: '1995-03-10', // Example date of birth
        },
      ];
      

    // Bulk insert users into the database
    await User.bulkCreate(users);

    console.log('Database seeding completed.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Execute the seed function
seedDatabase();

module.exports = seedDatabase;
