const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const FinancialElementType = sequelize.define('FinancialElementType', {
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
  tableName: 'financial_element_types'
});


module.exports = FinancialElementType;