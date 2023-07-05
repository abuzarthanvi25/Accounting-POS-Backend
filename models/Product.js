const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')
const Inventory = require("../models/Inventory")

const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  supplier_id: {
    type: Sequelize.INTEGER,
    // field: 'supplier_id'
  },
  product_name: {
    type: Sequelize.STRING
  },
  unit_cost: {
    type: Sequelize.INTEGER,
  },
  unit_price: {
    type: Sequelize.INTEGER,
  },
}, {
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns,
  tableName: 'products'
});

Product.hasMany(Inventory, { foreignKey: 'product_id' })
Inventory.belongsTo(Product, { foreignKey: 'product_id' })


module.exports = Product;