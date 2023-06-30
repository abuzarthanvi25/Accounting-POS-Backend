const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const OrderItems = sequelize.define('OrderItems', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  order_id: {
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
  tableName: 'order_items'
});


module.exports = OrderItems;