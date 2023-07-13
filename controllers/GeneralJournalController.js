const GeneralJournalModel = require("../models/GeneralJournal")
const { FinancialElemTypes }  = require("../constants")
const { Op } = require('sequelize');
const { getNetIncome } = require("../helpers/helpers")

const GeneralJournalController = {
  GetAllJournalEntries: async (request, response) => {
    
    try {
      // Retrieve all journal entries
      const allJournalEntries = await GeneralJournalModel.findAll();

      if(allJournalEntries){
        response.json({
          message: "All Journal Entries get successfully",
          status: true,
          data: allJournalEntries,
        });
        return
      }
    } catch (error) {
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

  GetEntriesByFinancialElemType: async (request, response) => {
    try {
      const {financial_element_type_id} = request.query

      if(!financial_element_type_id){
        response.status(400).json({
          message: "Financial element type id is required",
          status: false,
        });
        return
      }

      GeneralJournalModel.findAll({
        where: {
          financial_element_type_id: financial_element_type_id
        }
      }).then((entries) => {
        if(entries.length > 0 ){
          response.json({
            message: `All Journal Entries for financial element type id ${financial_element_type_id} get successfully`,
            status: true,
            data: entries,
          });
        }else{
          response.json({
            message: `No Journal Entries for financial element type id ${financial_element_type_id} found`,
            status: false,
            data: entries,
          });
        }
      }).catch((error) => {
        response.status(400).json({
          message: "Error fetching journal entries by financial elem type id",
          status: false,
          error: error
        });
      });
    } catch (error) {
      console.log(error)
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

  GetEntriesByDate: async (request, response) => {
    try {
      const {date_of_transaction} = request.query

      if(!date_of_transaction){
        response.status(400).json({
          message: "Date of transaction is required",
          status: false,
        });
        return
      }

      GeneralJournalModel.findAll({
        where: {
          date_of_transaction: date_of_transaction
        }
      }).then((entries) => {
        if(entries.length > 0 ){
          response.json({
            message: `All Journal Entries for the date ${date_of_transaction} get successfully`,
            status: true,
            data: entries,
          });
        }else{
          response.json({
            message: `No Journal Entries for the date ${date_of_transaction} found`,
            status: false,
            data: entries,
          });
        }
      }).catch((error) => {
        response.status(400).json({
          message: "Error fetching journal entries by date of transaction",
          status: false,
          error: error
        });
      });
    } catch (error) {
      console.log(error)
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

  GenerateIncomeStatement: async (request, response) => {
    try {
      const {date_of_transaction} = request.query

      const netIncomeData = await getNetIncome(response)

      if(!date_of_transaction){
        GeneralJournalModel.findAll({
          where: {
            financial_element_type_id: {
              [Op.in]: [FinancialElemTypes.Revenue, FinancialElemTypes.Expense],
            }
          }
        }).then((entries) => {
          if(entries.length > 0 ){
            response.json({
              message: `All Revenue and Expense Entries get successfully`,
              status: true,
              data: {
                revenueAndExpenseEntries: entries,
                netIncome: netIncomeData
              },
            });
          }else{
            response.json({
              message: `No Revenue and Expense Entries found`,
              status: false,
              data: entries,
            });
          }
        }).catch((error) => {
          response.status(400).json({
            message: "Error fetching Revenue and Expense entries by date of transaction",
            status: false,
            error: error
          });
        });
        return
      }

      GeneralJournalModel.findAll({
        where: {
          date_of_transaction: date_of_transaction,
          financial_element_type_id: {
            [Op.in]: [FinancialElemTypes.Revenue, FinancialElemTypes.Expense],
          }
        }
      }).then((entries) => {
        if(entries.length > 0 ){
          response.json({
            message: `All Revenue and Expense Entries for the date ${date_of_transaction} get successfully`,
            status: true,
            data: {
              revenueAndExpenseEntries: entries,
              netIncome: netIncomeData
            },
          });
        }else{
          response.json({
            message: `No Revenue and Expense Entries for the date ${date_of_transaction} found`,
            status: false,
            data: entries,
          });
        }
      }).catch((error) => {
        response.status(400).json({
          message: "Error fetching Revenue and Expense entries by date of transaction",
          status: false,
          error: error
        });
      });
    }catch (error) {
      console.log(error)
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

  GenerateBalanceSheet: async (request, response) => {
    try {
      const {date_of_transaction} = request.query

      if(!date_of_transaction){
        GeneralJournalModel.findAll({
          where: {
            financial_element_type_id: {
              [Op.in]: [FinancialElemTypes.Asset, FinancialElemTypes.Capital, FinancialElemTypes.Liability],
            }
          }
        }).then((entries) => {
          if(entries.length > 0 ){
            response.json({
              message: `All Assets, Capital and Liability Entries get successfully`,
              status: true,
              data: entries,
            });
          }else{
            response.json({
              message: `No Assets, Capital and Liability Entries found`,
              status: false,
              data: entries,
            });
          }
        }).catch((error) => {
          response.status(400).json({
            message: "Error fetching Assets, Capital and Liability entries",
            status: false,
            error: error
          });
        });
        return
      }

      GeneralJournalModel.findAll({
        where: {
          date_of_transaction: date_of_transaction,
          financial_element_type_id: {
            [Op.in]: [FinancialElemTypes.Asset, FinancialElemTypes.Capital, FinancialElemTypes.Liability],
          }
        }
      }).then((entries) => {
        if(entries.length > 0 ){
          response.json({
            message: `All Assets, Capital and Liability Entries for the date ${date_of_transaction} get successfully`,
            status: true,
            data: entries,
          });
        }else{
          response.json({
            message: `No Assets, Capital and Liability Entries for the date ${date_of_transaction} found`,
            status: false,
            data: entries,
          });
        }
      }).catch((error) => {
        response.status(400).json({
          message: "Error fetching Assets, Capital and Liability entries by date of transaction",
          status: false,
          error: error
        });
      });
    }catch (error) {
      console.log(error)
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

  GenerateStatementOfOwnersEquity: async (request, response) => {
    try {
      const capitalAndDrawingEntries = await GeneralJournalModel.findAll({
        where: {
          financial_element_type_id: {
            [Op.in]: [FinancialElemTypes.Capital, FinancialElemTypes.Drawing],
          }
        }
      })

      if(!capitalAndDrawingEntries){
        response.status(400).json({
          message: "Error Capital entries by date of transaction",
          status: false,
        });
      }

      const netIncomeData = await getNetIncome(response)

      response.json({
        message: 'All Capital Journal Enties and net income get sucessfully',
        status: false,
        data: {capitalAndDrawingEntries: capitalJournalEntries, netIncome: netIncomeData},
        
      })



    }catch (error) {
      console.log(error)
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  }
};


module.exports = GeneralJournalController;
