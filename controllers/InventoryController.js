const Inventory = require("../models/Inventory")

const InventoryController = {
  GetAllInventory: async (request, response) => {
    
    try {
      // Synchronize the model with the database
      await Inventory.sync();
      
      // Retrieve all products
      const allInventory = await Inventory.findAll({attributes: ['id', 'supplier_id', 'product_id', 'quantity_in_stock']});

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
};


module.exports = InventoryController;
