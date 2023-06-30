const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const Products = require("../models/Product")

const Inventory = sequelize.define('Inventory', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  supplier_id: {
    type: Sequelize.INTEGER,
  },
  product_id: {
    type: Sequelize.INTEGER
  },
  quantity_in_stock: {
    type: Sequelize.INTEGER,
  },
}, {
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns,
  tableName: 'inventory'
});

Inventory.hasMany(Products)


module.exports = Inventory;