const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const Invoice = sequelize.define('Invoice', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  customer_id: {
    type: Sequelize.INTEGER,
  },
  sub_total:{
    type: Sequelize.INTEGER
  },
  invoice_date: {
    type: Sequelize.DATE
  },
}, {
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns,
  tableName: 'invoices'
});


module.exports = Invoice;