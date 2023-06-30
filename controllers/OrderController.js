const Order = require("../models/Order")

const OrderController = {
  GetAllOrders: async (request, response) => {
    
    try {
      // Retrieve all orders
      const orders = await Order.findAll();

      if(orders){
        response.json({
          message: `${orders?.length} order${orders?.length > 1 ? "s" : ""} get successfully`,
          status: true,
          data: orders,
        });
        return
      }else{
        response.status(400).json({
            message: "Bad Request",
            status: false
        })
      }
    } catch (error) {
      console.error('Error retrieving orders', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

};


module.exports = OrderController;
