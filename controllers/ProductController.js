const Product = require("../models/Product")
const Supplier = require("../models/Supplier")
const Inventory = require("../models/Inventory")

const CustomerController = {
  GetAllProducts: async (request, response) => {
    
    try {
      // Retrieve all products
      const products = await Product.findAll(
       {
        include:[
                  {
                    model: Inventory,
                    attributes: ['quantity_in_stock']
                  }
                ]
    }
      );

      if(products){
        response.json({
          message: "Products get successfully",
          status: true,
          data: products,
        });
        return
      }
    } catch (error) {
      console.error('Error retrieving products:', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },
  
  AddProduct: async (request, response) => {
    
    try {
      const { supplier_id, product_name, quantity_in_stock, unit_price } = request.body;
  
      // Create a new product record
      if( supplier_id && product_name && quantity_in_stock && unit_price){

        const findSupplier = await Supplier.findAll({
          where: {
          id: supplier_id
        }
      });

      if(findSupplier && findSupplier?.length > 0){
          
        const productResponse = await Product.create({
          supplier_id , product_name , quantity_in_stock , unit_price,
        }, { fields: ['supplier_id','product_name', 'quantity_in_stock', 'unit_price'] });

  
        if(productResponse){
          const inventoryResponse = await Inventory.create({
            supplier_id , product_id:productResponse?.id , quantity_in_stock:productResponse?.quantity_in_stock , unit_price: productResponse?.unit_price,
          }, { fields: ['supplier_id','product_id', 'quantity_in_stock'] });

          if(inventoryResponse){
            response.json({
              message: "Product added successfully",
              status: true,
              data: productResponse,
            });
            return
          }else{
            response.status(400).json({ message: 'Error while adding product', status: false });
          }

        }
      } else{
        response.status(400).json({ message: 'Supplier id is invalid' });
      }



      }else{
        response.status(400).json({ message: 'All fields are required' });
      }
  
    } catch (error) {
      console.error('Error adding customer:', error);
      response.status(400).json({
        message: "Request Error",
        status: false,
        error: error?.message
      });
    }
  },

  GetProductsBySupplierId: async (request, response) => {
    try {
      const {supplier_id} = request.query

      if(!supplier_id){
        response.status(400).json({ 
          message: 'Supplier id is required',
          status: false,
        });
        return
      }

      Supplier.findByPk(supplier_id, {
        include: Product,
      }).then((products) => {
        if(products?.Products.length > 0){
          response.json({
            message: "Products get successfully",
            status: true,
            data: products,
          });
          return
        }else{
          response.json({
            message: "No products found for the given supplier id",
            status: true,
            data: products,
          });
        }
      }).catch((error) => {
        response.status(400).json({ 
          message: 'Error while fetching products by supplier id',
          status: false,
          error: error
        });
      });
    } catch (error) {
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  }
};


module.exports = CustomerController;
