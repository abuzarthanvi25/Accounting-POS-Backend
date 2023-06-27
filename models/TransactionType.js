const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const TransactionType = sequelize.define('TransactionType', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  type_name: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns,
  tableName: 'transaction_type'
});


module.exports = TransactionType;