const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const Order = sequelize.define('Order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  invoice_id: {
    type: Sequelize.INTEGER,
  },
  product_id:{
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  unit_price: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns,
  tableName: 'order'
});


module.exports = Order;