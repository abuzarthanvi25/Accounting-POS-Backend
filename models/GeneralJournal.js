const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize')

const FinancialElementType = require("../models/Financial_Elem_Type")
const TransactionType = require("../models/TransactionType")

const GeneralJournal = sequelize.define('GeneralJournal', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  transaction_type_id: {
    type: Sequelize.INTEGER
  },
  financial_element_type_id: {
    type: Sequelize.INTEGER
  },
  date_of_transaction: {
    type: Sequelize.STRING
  },
  account_title: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false, // Disable automatic creation of 'createdAt' and 'updatedAt' columns,
  tableName: 'general_journal'
});

GeneralJournal.belongsTo(FinancialElementType, { foreignKey: 'financial_element_type_id' });
GeneralJournal.belongsTo(TransactionType, { foreignKey: 'transaction_type_id' });




module.exports = GeneralJournal;