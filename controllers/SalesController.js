const Sales = require("../models/Sales")

const SalesController = {
  GetAllSales: async (request, response) => {
    
    try {
      // Retrieve all financial element types
      const allSales = await Sales.findAll();

      if(allSales){
        response.json({
          message: "All Sales get successfully",
          status: true,
          data: allSales,
        });
        return
      }
    } catch (error) {
      console.error('Error retrieving sales', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

  GetSalesByProductId: async (request, response) => {
    try {
        const {product_id} = request.query

        if(!product_id){
            response.status(400).json({
                message: "Product id is required",
                status: false,
            });
        }
        

        Sales.findAll({
            where: {
              product_id: product_id,
            },
          }).then((sales) => {
            if(sales.length > 0){
                response.json({
                    message: `All Sales for product id ${product_id} get successfully`,
                    status: true,
                    data: sales,
                  });
                  return
            }else{
                response.json({
                    message: `No Sales for product id ${product_id} found`,
                    status: false,
                    data: sales
                });
            }
            
          }).catch((error) => {
            response.status(400).json({
                message: "Error getting sales by product id",
                status: false,
                error: error
            });
          });
    } catch (error) {
      console.error('Error retrieving sales', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

  GetSalesByOrderId: async (request, response) => {
    try {
        const {order_id} = request.query

        if(!order_id){
            response.status(400).json({
                message: "Order id is required",
                status: false,
            });
        }
        

        Sales.findAll({
            where: {
              order_id: order_id,
            },
          }).then((sales) => {
            if(sales.length > 0){
                response.json({
                    message: `All Sales for order id ${order_id} get successfully`,
                    status: true,
                    data: sales,
                  });
                  return
            }else{
                response.json({
                    message: `No Sales for order id ${order_id} found`,
                    status: true,
                    data: sales,
                  });
                  return
            }
          }).catch((error) => {
            response.status(400).json({
                message: "Error getting sales by order id",
                status: false,
                error: error
            });
          });
    } catch (error) {
      console.error('Error retrieving sales', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  }
};


module.exports = SalesController;
