const FinancialElemType = require("../models/Financial_Elem_Type")

const {getFinancialElementTypeId} = require("../helpers/helpers")

const FinancialElemTypeController = {
  GetAllFinancialElemTypes: async (request, response) => {
    
    try {
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
  GetFinancialElemTypeById: async (request, response) => {
    
    try {

      const {financiel_elem_type_id} = request.query

      // Retrieve all financial element types
      const financialElemTypes = await FinancialElemType.findAll({
        where:{
          id: financiel_elem_type_id
        }
      });

      if(financialElemTypes){
        response.json({
          message: "Financial Element Type get successfully",
          status: true,
          data: financialElemTypes,
        });
        return
      }
    } catch (error) {
      console.error('Error retrieving Financial Element Type:', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

};


module.exports = FinancialElemTypeController;
