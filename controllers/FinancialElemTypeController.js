const FinancialElemType = require("../models/Financial_Elem_Type")

const FinancialElemTypeController = {
  GetAllFinancialElemTypes: async (request, response) => {
    
    try {
      // Synchronize the model with the database
      await FinancialElemType.sync();
      
      // Retrieve all financial element types
      const financialElemTypes = await FinancialElemType.findAll({attributes: ['id', 'type_name', ]});

      if(financialElemTypes){
        response.json({
          message: "Financial Element Types get successfully",
          status: true,
          data: financialElemTypes,
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


module.exports = FinancialElemTypeController;
