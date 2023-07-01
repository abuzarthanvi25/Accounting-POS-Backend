const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const Order = sequelize.define('Order', {
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
  order_date: {
    type: Sequelize.DATE
  },
}, {
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns,
  tableName: 'orders'
});


module.exports = Order;