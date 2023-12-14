const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const Admin = sequelize.define('Admin', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  }
}, {
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns,
  tableName: 'admins'
});

module.exports = Admin;