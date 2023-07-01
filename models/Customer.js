const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const Customer = sequelize.define('Customer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  customer_name: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns,
  tableName: 'customers'

  
});

module.exports = Customer;