const GeneralJournalModel = require("../models/GeneralJournal")

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

  GenerateBalanceSheet: async (request, response) => {

  },

  GenerateIncomeStatement: async (request, response) => {

  },

  GenerateStatementOfOwnersEquity: async (request, response) => {

  }
};


module.exports = GeneralJournalController;