let express = require("express");
let router = express.Router();
const CustomerController = require("../controllers/CustomerController")
const ProductController = require("../controllers/ProductController")
const SupplierController = require("../controllers/SupplierController")
const InventoryController = require("../controllers/InventoryController")
const FinancialElemTypeController = require("../controllers/FinancialElemTypeController")
const TransactionTypeController = require("../controllers/TransactionTypeController")

//NOTE - TEST ROUTE
router.get("/", (req, res) => {
    res.json({
      message: "Test Route",
      status: true,
    });
  });

// < ============================================== MAIN ROUTES ============================================== >

//NOTE - CUSTOMER ROUTES ===================== >
router.get("/api/customer", CustomerController.GetAllCustomers)
router.get("/api/find/customer", CustomerController.GetCustomerByName)
router.post("/api/customer", CustomerController.AddCustomer)
router.delete("/api/customer", CustomerController.DeleteCustomer)

//NOTE - PRODUCT ROUTES ===================== >
router.get("/api/products", ProductController.GetAllProducts)
router.post("/api/products", ProductController.AddProduct)

//NOTE - SUPPLIER ROUTES ===================== >
router.get("/api/suppliers", SupplierController.GetAllSuppliers)
router.get("/api/find/suppliers", SupplierController.GetSupplierByName)
router.post("/api/suppliers", SupplierController.AddSupplier)

//NOTE - INVENTORY ROUTES ===================== >
router.get("/api/inventory", InventoryController.GetAllInventory)

//NOTE - FINANCIAL ELEMENT TYPE ROUTES ===================== >
router.get("/api/elem-types", FinancialElemTypeController.GetAllFinancialElemTypes)

//NOTE - TRANSACTION TYPE ROUTES ===================== >
router.get("/api/transaction-types", TransactionTypeController.GetAllTransactionTypes)

module.exports = router;