const connection = require("../db/connection")
const Customer = require("../models/Customer.js")

const CustomerController = {
  GetAll: (request, response) => {

    connection.query('SELECT * FROM customers', (err, results) => {
        if (err) {
            response.json({
                message: "DB Error",
                status: false,
                error: err
              });
          return;
        }
        
        response.json({
            message: "Customers get successfully",
            users: results,
            status: true,
          });
      });
    
  },

  GetAllCustomers: async (request, response) => {
    
    try {
      // Synchronize the model with the database
      await Customer.sync();
      
      // Retrieve all customers
      const customers = await Customer.findAll({attributes: ['id', 'customer_name']});

      if(customers){
        response.json({
          message: "Customers get successfully",
          customers: customers,
          status: true,
        });
        return
      }
    } catch (error) {
      console.error('Error retrieving customers:', error);
      response.json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

  AddCustomer : async (request, response) => {
    try {
      await Customer.sync();
      const { customer_name } = request.body;
  
      // Create a new customer record
      if(customer_name){
        const customer = await Customer.create({
          customer_name,
        }, { fields: ['customer_name'] });
  
        if(customer){
          response.json({
            message: "Customer added successfully",
            customer: customer,
            status: true,
          });
          return
        }
      }else{
        response.status(400).json({ message: 'No Customer Name specified' });
      }
  
    } catch (error) {
      console.error('Error adding customer:', error);
      response.json({
        message: "Request Error",
        status: false,
        error: error?.message
      });
    }
  },

  GetCustomerByName: async (request, response) => {
    try {
      await Customer.sync();

      const { customer_name } = request.query;

      if(!customer_name){
        response.json({
          message: "Request Error",
          status: false,
          error: "No Customer Name Specified!"
        });
        return
      }
      else{
        Customer.findAll({
          where: {
            customer_name: customer_name
          }

        
        }).then((customer) => {
          if(customer?.length > 0){
            response.json({
              message: "Customer found successfully",
              customer: customer,
              status: true,
            });
          }else{
            response.json({
              message: `No Customer with name ${customer_name} found`,
              status: false,
            });
          }
        }).catch((error)=> {
          response.json({
            message: "Request Error",
            status: false,
            error: error
          });
        })
      }
    } catch (error) {
      response.json({
        message: "Server Error",
        status: false,
        error: error
      });
    }
  },

  DeleteCustomer : async (request, response) => {
    try {
      await Customer.sync();
      const { customer_name } = request.query;
  
      if(!customer_name){
        response.json({
          message: "Request Error",
          status: false,
          error: "No Customer Name Specified!"
        });
        return
      }
      else{
        Customer.findAll({
          where: {
            customer_name: customer_name
          }

        
        }).then((customer) => {
          if(customer?.length > 0){
            Customer.destroy({
              where: {
                customer_name: customer_name
              }
            }).then((cus_id) => {
              response.json({
                message: `Customer ${customer_name} deleted successfully`,
                customer_id: cus_id,
                status: true,
              });
            }).catch((error) => {
              response.json({
                message: "Request Error",
                status: false,
                error: "Error while deleting customer"
              });
            })
          }else{
            response.json({
              message: `No Customer with name ${customer_name} found`,
              status: false,
            });
          }
        }).catch((error)=> {
          response.json({
            message: "Request Error",
            status: false,
            error: error
          });
        })
      }

  
    } catch (error) {
      console.error('Error deleting  customer:', error);
      response.json({
        message: "Request Error",
        status: false,
        error: error?.message
      });
    }
  },


};

module.exports = CustomerController;
