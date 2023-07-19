const SalesModel = require("../models/Sales")
const CustomerModel = require("../models/Customer")
const SupplierModel = require("../models/Supplier")
const ProductModel = require("../models/Product")
const InventoryModel = require("../models/Inventory")
const OrderModel = require("../models/Order")

const { getNetIncome, getTotalCapital } = require("../helpers/helpers")

const moment = require('moment');

const sequelize = require('../db/sequelize');

const OrderController = {
  GetDashboardData: async (request, response) => {
    
    try {
      const totalRevenue = await OrderModel.sum('sub_total')

      const numberOfOrders = await OrderModel.count()

      const numberOfCustomers = await CustomerModel.count()

      const numberOfSuppliers = await SupplierModel.count()

      const numberOfMarketplaceProducts = await ProductModel.count()

      const numberOfInventoryProducts = await InventoryModel.count()

      const netIncomeData = await getNetIncome(response)

      const totalCapital = await getTotalCapital(response)

      if(!totalCapital){
        return
      }

      const productsSold = await SalesModel.sum('quantity_sold')

      const totalInventory = await InventoryModel.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('Product.unit_cost')), 'total_cost']],
        include: [{
          model: ProductModel,
          attributes: []
        }]
      })

      const totalInventoryWorth = totalInventory[0].dataValues.total_cost

      if(!totalRevenue || totalRevenue?.length == 0){
        response.status(400).json({
            message: "Error fetching total sales",
            status: false,
          });
          return
      }

      if(!numberOfCustomers || numberOfCustomers.length == 0){
        response.status(400).json({
            message: "Error fetching number of customers",
            status: false,
          });
          return
      }

      if(!numberOfSuppliers || numberOfSuppliers.length == 0){
        response.status(400).json({
            message: "Error fetching number of suppliers",
            status: false,
          });
          return
      }

      if(!numberOfMarketplaceProducts || numberOfMarketplaceProducts.length == 0){
        response.status(400).json({
            message: "Error fetching number of marketplace products",
            status: false,
          });
          return
      }

      if(!totalInventoryWorth || !totalInventory || totalInventory.length == 0){
        response.status(400).json({
            message: "Error fetching total inventory worth",
            status: false,
          });
          return
      }

      if(!numberOfOrders || numberOfOrders.length == 0){
        response.status(400).json({
            message: "Error fetching number of Orders",
            status: false,
          });
          return
      }

      if(!productsSold || productsSold.length == 0){
        response.status(400).json({
            message: "Error fetching number of products sold",
            status: false,
          });
          return
      }

      if(!numberOfInventoryProducts || numberOfInventoryProducts.length == 0){
        response.status(400).json({
            message: "Error fetching number of inventory products",
            status: false,
          });
          return
      }

      response.json({
        message: `Dashboard data fetched successfully`,
        status: true,
        data: {
            total_revenue: totalRevenue,
            number_of_orders: numberOfOrders,
            number_of_customers: numberOfCustomers,
            number_of_suppliers: numberOfSuppliers,
            number_of_marketplace_products: numberOfMarketplaceProducts,
            products_in_inventory: numberOfInventoryProducts,
            number_of_products_sold: productsSold,
            total_inventory_worth: parseInt(totalInventoryWorth),
            total_capital: totalCapital,
            net_income: netIncomeData,
        },
      });

      
    } catch (error) {
      console.error('Error retrieving dashboard data', error);
      response.status(400).json({
        message: "DB Error",
        status: false,
        error: error
      });
    }
  },

};


module.exports = OrderController;
