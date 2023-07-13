const OrderItemsModel = require("../models/OrderItems")
const OrderModel = require("../models/Order")
const InventoryModel = require("../models/Inventory")
const SalesModel = require("../models/Sales")
const Journal = require("../models/GeneralJournal")

const sequelize = require('../db/sequelize')
const moment = require('moment');

const { TransactionTypes, FinancialElemTypes, AccountTitles, NumericalConstants } = require('../constants')
const { getTransactionTypeModelId, getFinancialElementTypeId } = require('../helpers/helpers')

const OrderItemsController = {
  GetFullOrder: async (request, response) => {
    
    try {
      const { order_id } = request.query;

      if(!order_id){
        response.status(400).json({
            message: "Order id is required",
            status: false
        })
        return
      }else{
          // Retrieve all transaction types
          const OrderItems = await OrderItemsModel.findAll({
            where: {
                order_id: order_id
              }
          });
    
          if(OrderItems){
            if(OrderItems.length == 0){
              response.status(400).json({
                message: `Invalid order id`,
                status: true,
              });
              return
            }
            response.json({
              message: `${OrderItems?.length} Order items get successfully`,
              status: true,
              data: OrderItems,
            });
            return
          }else{
            response.status(400).json({
                message: "Bad Request",
                status: false
            })
          }
      }
      
    } catch (error) {
      console.error('Error retrieving orders:', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

  CreateAnOrder: async (request, response) => {
    try {
      const transaction = await sequelize.transaction();
      
      const { customer_id, order_items } = request.body

      const order_date = moment(new Date()).format("DD/MM/YYYY").toString()

      const sub_total = order_items.reduce((accumulator, product) => {
        return accumulator + product.unit_price;
      }, 0);

      const COGS = order_items.reduce((accumulator, product) => {
        return accumulator + product.unit_cost;
      }, 0);

      let journalPayload = []
      let apiResponse = {
        createdOrderItems: [],
        newSales: [],
        updatedInventory: []
      }

      journalPayload.push(
        {
        transaction_type_id: await getTransactionTypeModelId(TransactionTypes.Debit),
        financial_element_type_id: await getFinancialElementTypeId(FinancialElemTypes.Asset),
        date_of_transaction: moment(new Date()).format("DD/MM/YYYY"),
        account_title: AccountTitles.Cash,
        amount: sub_total
      },
      {
        transaction_type_id: await getTransactionTypeModelId(TransactionTypes.Debit),
        financial_element_type_id: await getFinancialElementTypeId(FinancialElemTypes.Revenue),
        date_of_transaction: moment(new Date()).format("DD/MM/YYYY"),
        account_title: AccountTitles.SalesRevenue,
        amount: sub_total
      },
      {
        transaction_type_id: await getTransactionTypeModelId(TransactionTypes.Debit),
        financial_element_type_id: await getFinancialElementTypeId(FinancialElemTypes.Expense),
        date_of_transaction: moment(new Date()).format("DD/MM/YYYY"),
        account_title: AccountTitles.CostOfGoodsSold,
        amount: COGS
      },
      {
        transaction_type_id: await getTransactionTypeModelId(TransactionTypes.Credit),
        financial_element_type_id: await getFinancialElementTypeId(FinancialElemTypes.Asset),
        date_of_transaction: moment(new Date()).format("DD/MM/YYYY"),
        account_title: AccountTitles.Inventory,
        amount: COGS
      },

      )

      // order_items?.forEach((val) => {
      //   journalPayload.push({
      //     transaction_type_id: TransactionTypes.Credit,
      //     financial_element_type_id: FinancialElemTypes.Asset,
      //     date_of_transaction: moment(new Date()).format("DD/MM/YYYY"),
      //     account_title: `${AccountTitles.Product}`,
      //     amount: val?.unit_price
      //   })

      //   journalPayload.push({
      //     transaction_type_id: TransactionTypes.Debit,
      //     financial_element_type_id: FinancialElemTypes.Expense,
      //     date_of_transaction: moment(new Date()).format("DD/MM/YYYY"),
      //     account_title: AccountTitles.SalesTaxExpense,
      //     amount: val?.unit_price * NumericalConstants.SalesTaxRate
      //   })

      //   journalPayload.push({
      //     transaction_type_id: TransactionTypes.Credit,
      //     financial_element_type_id: FinancialElemTypes.Revenue,
      //     date_of_transaction: moment(new Date()).format("DD/MM/YYYY"),
      //     account_title: AccountTitles.SalesRevenue,
      //     amount: val?.unit_price
      //   })

      // })

      const journalResponse = await Journal.bulkCreate(journalPayload, { transaction })

      if(!journalResponse || journalResponse.length == 0){
        response.status(400).json({
          message: "Error creating journal entries",
          status: false,
        });
        return
      }
      

      if(customer_id && sub_total && order_date && order_items && journalResponse){
        //SECTION - Creating order
        const createdOrder = await OrderModel.create({
          customer_id: customer_id,
          order_date: order_date,
          sub_total: sub_total
        }, 
        { transaction }
        )

        if(createdOrder){
          const orderItemsPayload = order_items?.map((val) => ({
            order_id: createdOrder?.id,
            product_id: val?.product_id,
            quantity: val?.quantity,
            unit_cost: val?.unit_cost,
            unit_price: val?.unit_price,
          }))


          const createdOrderItems = await OrderItemsModel.bulkCreate(orderItemsPayload,
            { transaction }
            )

            apiResponse.createdOrderItems.push(createdOrderItems)

            if(createdOrderItems){
              for(const orderItem of orderItemsPayload){
                const updatedInventoryInstance =  await InventoryModel.decrement(
                  { quantity_in_stock: orderItem?.quantity},
                  {
                    where: { product_id: orderItem?.product_id },
                    transaction,
                  }
                )

                if(!updatedInventoryInstance){
                  response.status(400).json({
                    message: `Error decrementing inventory`,
                    status: false
                  })
                  return
                }

                apiResponse.updatedInventory.push(updatedInventoryInstance)

                const createdSales = await SalesModel.create({
                  order_id: createdOrder?.id,
                  product_id: orderItem?.product_id,
                  quantity_sold: orderItem?.quantity,
                  unit_cost: orderItem?.unit_cost,
                  unit_price: orderItem?.unit_price,
                  date: order_date
                }, { fields: ['order_id','product_id', 'quantity_sold','unit_cost', 'unit_price', 'date'], transaction })

                if(!createdSales){
                  response.status(400).json({
                    message: `Error creating sales`,
                    status: false
                  })
                  return
                }

                apiResponse.newSales.push(createdSales)
                
              }

              await transaction.commit();
              response.json({
                message: `Order with order id ${createdOrder?.id} created successfully`,
                status: true,
                order_id: createdOrder?.id,
                orderItems: apiResponse.createdOrderItems,
                sales: apiResponse.newSales,
                updatedInventory: apiResponse.updatedInventory,
                journalEntries: journalResponse
              })
            }else{
              response.status(400).json({
                message: `Error creating order items`,
                status: false
              })
            }
        }else{
          response.status(400).json({
            message: `Error creating order`,
            status: false
          })
          return
        }
          
          
      }
    } catch (error) {
      console.error('Error creating orders:', error);
          response.status(400).json({
            message: "DB Error",
            status: false,
            error: error
          });
    }
  }
};


module.exports = OrderItemsController;
