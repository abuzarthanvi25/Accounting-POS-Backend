const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  supplier_id: {
    type: Sequelize.INTEGER,
  },
  product_name: {
    type: Sequelize.STRING
  },
  quantity_in_stock: {
    type: Sequelize.INTEGER,
  },
  unit_price: {
    type: Sequelize.INTEGER,
  },
}, {
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns,
});


module.exports = Product;