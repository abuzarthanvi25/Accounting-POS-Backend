const FinancialElementTypeModel = require("../models/Financial_Elem_Type")
const TransactionTypeModel = require("../models/TransactionType")

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

module.exports = {
    responseHandler,
    getFinancialElementTypeId,
    getTransactionTypeModelId
}