const OrderItemsModel = require("../models/OrderItems")

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

};


module.exports = OrderItemsController;
