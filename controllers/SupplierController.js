const Supplier = require("../models/Supplier")

const SupplierController = {
  GetAllSuppliers: async (request, response) => {
    
    try {
      // Synchronize the model with the database
      await Supplier.sync();
      
      // Retrieve all suppliers
      const suppliers = await Supplier.findAll({attributes: ['id', 'supplier_name', ]});

      if(suppliers){
        response.json({
          message: "Suppliers get successfully",
          status: true,
          data: suppliers,
        });
        return
      }
    } catch (error) {
      console.error('Error retrieving suppliers:', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

  AddSupplier: async (request, response) => {
    try {
      await Supplier.sync();
      const { supplier_name } = request.body;
  
      // Create a new supplier record
      if(supplier_name){
        const supplier = await Supplier.create({
          supplier_name,
        }, { fields: ['supplier_name'] });
  
        if(supplier){
          response.json({
            message: "Supplier added successfully",
            status: true,
            data: supplier,
          });
          return
        }
      }else{
        response.status(400).json({ message: 'No Supplier Name specified' });
      }
  
    } catch (error) {
      console.error('Error adding supplier:', error);

      response.status(400).json({
        message: "Request Error",
        status: false,
        error: error?.message
      });
    }
  },

  GetSupplierByName: async (request, response) => {
    try {
      await Supplier.sync();

      const { supplier_name } = request.query;

      if(!supplier_name){
        response.json({
          message: "Request Error",
          status: false,
          error: "No Supplier Name Specified!"
        });
        return
      }
      else{
        Supplier.findAll({
          where: {
            supplier_name: supplier_name
          }

        
        }).then((supplier) => {
          if(supplier?.length > 0){
            response.json({
              message: "Supplier found successfully",
              status: true,
              data: supplier,
            });
          }else{
            response.json({
              message: `No Supplier with name ${supplier_name} found`,
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
      response.status(400).json({
        message: "Server Error",
        status: false,
        error: error
      });
    }
  },
};


module.exports = SupplierController;
