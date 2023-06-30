const Order = require("../models/Order")

const OrderController = {
  GetFullOrder: async (request, response) => {
    
    try {
      const { invoice_id } = request.query;

      if(!invoice_id){
        response.status(400).json({
            message: "Invoice id is required",
            status: false
        })
        return
      }else{
          // Retrieve all transaction types
          const order = await Order.findAll({
            where: {
                invoice_id: invoice_id
              }
          });
    
          if(order){
            response.json({
              message: "Order get successfully",
              status: true,
              data: order,
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
      console.error('Error retrieving invoices:', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

};


module.exports = OrderController;
