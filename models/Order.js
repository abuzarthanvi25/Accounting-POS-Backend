const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const OrderItems = require("../models/OrderItems")

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
    type: Sequelize.STRING
  },
}, {
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns,
  tableName: 'orders'
});

Order.hasMany(OrderItems, { foreignKey: 'order_id' });
OrderItems.belongsTo(Order, { foreignKey: 'order_id' });


module.exports = Order;