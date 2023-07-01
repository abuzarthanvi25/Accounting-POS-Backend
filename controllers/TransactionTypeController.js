const TransactionType = require("../models/TransactionType")

const TransactionTypeController = {
  GetAllTransactionTypes: async (request, response) => {
    
    try {
      // Retrieve all transaction types
      const TransactionTypes = await TransactionType.findAll({attributes: ['id', 'type_name', ]});

      if(TransactionTypes){
        response.json({
          message: "Transaction Types get successfully",
          status: true,
          data: TransactionTypes,
        });
        return
      }
    } catch (error) {
      console.error('Error retrieving suppliers:', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

};


module.exports = TransactionTypeController;
