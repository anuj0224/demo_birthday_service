const Sequelize = require('sequelize');
const sequelize = new Sequelize(require('../config/config.json').development); // Replace with your environment

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false,
      },
});

module.exports = User;
