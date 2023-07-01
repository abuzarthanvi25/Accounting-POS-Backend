const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')
const Product = require("../models/Product")

const Supplier = sequelize.define('Supplier', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  supplier_name: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns
  tableName: 'suppliers'
});

Supplier.hasMany(Product, { foreignKey: 'supplier_id' });
Product.belongsTo(Supplier, { foreignKey: 'supplier_id' });

module.exports = Supplier;