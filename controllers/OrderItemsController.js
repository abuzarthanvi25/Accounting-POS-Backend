const OrderItemsModel = require("../models/OrderItems")
const OrderModel = require("../models/Order")
const InventoryModel = require("../models/Inventory")
const SalesModel = require("../models/Sales")
const ProductModel = require("../models/Product")

const sequelize = require('../db/sequelize')

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
      
      const { customer_id, sub_total, order_items } = request.body

      const order_date = new Date().toString()

      if(customer_id && sub_total && order_date && order_items){
        //SECTION - Creating order
        OrderModel.create({
          customer_id: customer_id,
          order_date: order_date,
          sub_total: sub_total
        }, 
        { transaction }
        ).then((order) => {
          const orderItemsPayload = order_items?.map((val) => ({
            order_id: order?.id,
            product_id: val?.product_id,
            quantity: val?.quantity,
            unit_cost: val?.unit_cost,
            unit_price: val?.unit_price,
          }))
          
          //SECTION - Creating order items
          OrderItemsModel.bulkCreate(orderItemsPayload,
             { transaction }
             ).then(()=>{
              orderItemsPayload.map((val)=>{
                // Handling inventory
                InventoryModel.decrement(
                  { quantity_in_stock: val?.quantity},
                  {
                    where: { product_id: val?.product_id },
                    transaction,
                  }
                ).then(()=>{
                  // Handling sales
                  SalesModel.create({
                    order_id: order?.id,
                    product_id: val?.product_id,
                    quantity_sold: val?.quantity,
                    unit_cost: val?.unit_cost,
                    unit_price: val?.unit_price,
                    date: order_date
                  }).then((sales)=>{
                  transaction.commit();
                  response.json({
                    message: `Order with order id ${order?.id} created successfully`,
                    status: true,
                    order_id: order?.id,
                    order: orderItemsPayload,
                    sales: sales
                  })
                  }).catch((error)=>{
                    response.status(400).json({
                      message: "Error creating order at 106",
                      status: false,
                      error: error
                    });
                  })

                  
                }).catch((error)=>{
                  response.status(400).json({
                    message: "Error creating order at 77",
                    status: false,
                    error: error
                  });
                })
                

                //TODO -  Handling journal entries
              })
          }).catch((error)=>{
            response.status(400).json({
              message: "Error creating order at 93",
              status: false,
              error: error
            });
          })


        }).catch((error) => {
          response.status(400).json({
            message: "Error creating order at 81",
            status: false,
            error: error
          });
        })
          
          
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