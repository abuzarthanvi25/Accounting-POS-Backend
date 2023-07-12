const Inventory = require("../models/Inventory")
const Journal = require("../models/GeneralJournal")
const Product = require("../models/Product")

const sequelize = require('../db/sequelize');
const moment = require('moment');

const { getTransactionTypeModelId, getFinancialElementTypeId } = require('../helpers/helpers');
const { TransactionTypes, FinancialElemTypes, AccountTitles } = require('../constants');

const InventoryController = {
  GetAllInventory: async (request, response) => {
    
    try {
      // Retrieve all products
      const allInventory = await Inventory.findAll({
        include:Product
      });

      if(allInventory){
        response.json({
          message: "Inventory get successfully",
          status: true,
          data: allInventory,
        });
        return
      }
    } catch (error) {
      console.error('Error retrieving inventory:', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

  AddProductsToInventory: async (request, response) => {
    try {
      const transaction = await sequelize.transaction();

      const { products_bought } = request.body

      if(products_bought && Array.isArray(products_bought) && products_bought.length > 0){

        const updatedRows = [];
        const journalPayload = [];

        const sub_total = products_bought.reduce((accumulator, product) => {
          return accumulator + product?.unit_cost;
        }, 0);
        
        journalPayload.push({
          transaction_type_id: await getTransactionTypeModelId(TransactionTypes.Debit),
          financial_element_type_id: await getFinancialElementTypeId(FinancialElemTypes.Asset),
          date_of_transaction: moment(new Date()).format("DD/MM/YYYY"),
          account_title: AccountTitles.AccountsReceivable,
          amount: sub_total
        })

        for(const product of products_bought){
          const {id: productId, quantity, unit_cost} = product

          journalPayload.push({
            transaction_type_id: await getTransactionTypeModelId(TransactionTypes.Credit),
            financial_element_type_id: await getFinancialElementTypeId(FinancialElemTypes.Asset),
            date_of_transaction: moment(new Date()).format("DD/MM/YYYY"),
            account_title: AccountTitles.Product,
            amount: unit_cost
          })

          const existingProductInInventory = await Inventory.findOne({
            where:{
              product_id: productId
            },
            transaction
          })

          if(existingProductInInventory){
            await existingProductInInventory.increment('quantity_in_stock', { by: quantity, transaction });
            updatedRows.push({
              action: `Quantity In Stock for product id ${productId} incremented by ${quantity}`,
              existingProductInInventory
            });
          }else{
            const newProductInInventory = await Inventory.create({
              product_id: productId,
              quantity_in_stock: quantity
            }, { fields: ['product_id','quantity_in_stock'], transaction }
            )

            updatedRows.push({
              action: `New Product in inventory added with id ${productId}`,
              newProductInInventory
            });
          }
        }

        const journalResponse = await Journal.bulkCreate(journalPayload, { transaction })

        if(!journalResponse || journalResponse.length == 0){
          response.status(400).json({
            message: "Error creating journal entries",
            status: false
          })
          return
        }

        transaction.commit();
        response.json({
          message: "Inventory updated successfully",
          status: true,
          data: {
            updatedInventory: updatedRows,
            journalEntries: journalResponse
          }
        })
        
      }else{
        response.status(400).json({
          message: "Products Bought must be an array of objects",
          status: false,
        });
        return
      }

      

    } catch (error) {
      console.error('Error retrieving inventory:', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  }
};


module.exports = InventoryController;
