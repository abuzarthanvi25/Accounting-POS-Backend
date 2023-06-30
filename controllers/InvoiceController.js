const Invoice = require("../models/Invoice")

const InvoiceController = {
  GetAllInvoices: async (request, response) => {
    
    try {
      // Retrieve all transaction types
      const invoices = await Invoice.findAll();

      if(invoices){
        response.json({
          message: "Invoices Types get successfully",
          status: true,
          data: invoices,
        });
        return
      }else{
        response.status(400).json({
            message: "Bad Request",
            status: false
        })
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


module.exports = InvoiceController;
