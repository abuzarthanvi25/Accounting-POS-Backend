const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const Inventory = sequelize.define('Inventory', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
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



module.exports = Inventory;