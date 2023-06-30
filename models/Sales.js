const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

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
  
  
  module.exports = Sales;