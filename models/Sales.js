const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')
const Product = require("../models/Product")
const Order = require("../models/Order")

const Sales = sequelize.define('Sales', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    order_id: {
      type: Sequelize.INTEGER,
    },
    product_id: {
      type: Sequelize.INTEGER
    },
    quantity_sold: {
      type: Sequelize.INTEGER
    },
    unit_cost: {
        type: Sequelize.INTEGER,
    },
    unit_price: {
        type: Sequelize.INTEGER,
    },
    date: {
      type: Sequelize.STRING,
    },
  }, {
    timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns,
    tableName: 'sales'
  });

  Sales.belongsTo(Order, { foreignKey: 'order_id' });
  Sales.belongsTo(Product, { foreignKey: 'product_id' });
    
  
  module.exports = Sales;