const FinancialElementTypeModel = require("../models/Financial_Elem_Type")
const TransactionTypeModel = require("../models/TransactionType")
const GeneralJournalModel = require("../models/GeneralJournal")

const { Op } = require('sequelize');
const { FinancialElemTypes, TransactionTypes } = require('../constants');

const responseHandler = (response ,responseCode, error, message) => {
    return response.status(responseCode).json({
        message: message,
        status: false,
        error: error ?? null
    })
}

const getFinancialElementTypeId = async (elemTypeId) => {
    try {
        let FinancialElemType = await FinancialElementTypeModel.findAll({
            where:{
              id: elemTypeId
            }
          });
    
        if(FinancialElemType){
            return FinancialElemType[0]?.id
        }else{
            return null
        }
    } catch (error) {
        throw error
    }
    
}

const getTransactionTypeModelId = async (transactionTypeId) => {
    try {
        let transactionType = await TransactionTypeModel.findAll({
            where:{
              id: transactionTypeId
            }
          });
    
        if(transactionType){
            return transactionType[0]?.id
        }else{
            return null
        }
    } catch (error) {
        throw error
    }
   
}

const getNetIncome = async (response) => {
    try {
        const allRevenueAndExpenseEntries = await GeneralJournalModel.findAll({
            where: {
              financial_element_type_id: {
                [Op.in]: [FinancialElemTypes.Revenue, FinancialElemTypes.Expense],
              }
            }
          })

        if(allRevenueAndExpenseEntries.length == 0){
            response.status(400).json({
                message: "No Revenue and expense entries found",
                status: false,
            })
            return
        }

        const modifiedData = allRevenueAndExpenseEntries.reduce((accumulator, entry) => {
            if(entry.financial_element_type_id == FinancialElemTypes.Expense){
                accumulator.expenses.push(entry)
            }else if(entry.financial_element_type_id == FinancialElemTypes.Revenue){
                accumulator.revenues.push(entry)
            }

            return accumulator
          }, {expenses: [], revenues: []});

          
          const revenuesTotal =  modifiedData.revenues.reduce((accumulator, revenueEntry) => {
            return accumulator + revenueEntry.amount
          }, 0)

          const expensesTotal =  modifiedData.expenses.reduce((accumulator, expenseEntry) => {
            return accumulator + expenseEntry.amount
          }, 0)

          const netIncome = revenuesTotal - expensesTotal
          
          return {
            netIncome,
            incomeStatus: netIncome > 0 ? 'Profit' : 'Loss'
          }

    } catch (error) {
        console.log(error, "error")
        response.status(400).json({
            message: "DB error",
            status: false,
            error: error
        })
        return
    }
}

const getTotalCapital = async (response) => {
    try {
        const allCapitalEntries = await GeneralJournalModel.findAll({
            where: {
              financial_element_type_id: {
                [Op.in]: [FinancialElemTypes.Capital],
              }
            }
          })

        if(allCapitalEntries.length == 0){
            response.status(400).json({
                message: "No Capital entries found",
                status: false,
            })
            return
        }


        const modifiedData = allCapitalEntries.reduce((accumulator, entry) => {
            if(entry.transaction_type_id == TransactionTypes.Debit){
                accumulator.debitEntries.push(entry)
            }else if(entry.transaction_type_id == TransactionTypes.Credit){
                accumulator.creditEntries.push(entry)
            }

            return accumulator
          }, {debitEntries: [], creditEntries: []});

          const debitTotal =  modifiedData.debitEntries.reduce((accumulator, debitEntry) => {
            return accumulator + debitEntry.amount
          }, 0)

          const creditTotal =  modifiedData.creditEntries.reduce((accumulator, creditEntry) => {
            return accumulator + creditEntry.amount
          }, 0)

          const totalCapital = Math.abs(debitTotal - creditTotal)

          return totalCapital

    } catch (error) {
        console.log(error, "error")
        response.status(400).json({
            message: "DB error",
            status: false,
            error: error
        })
        return
    }
}

module.exports = {
    responseHandler,
    getFinancialElementTypeId,
    getTransactionTypeModelId,
    getNetIncome,
    getTotalCapital
}