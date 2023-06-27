let express = require("express");
let router = express.Router();
const CustomerController = require("../controllers/CustomerController")
const ProductController = require("../controllers/ProductController")
const SupplierController = require("../controllers/SupplierController")
const InventoryController = require("../controllers/InventoryController")
const FinancialElemTypeController = require("../controllers/FinancialElemTypeController")
const TransactionTypeController = require("../controllers/TransactionTypeController")

//NOTE - TEST ROUTE
router.post("/", (req, res) => {
    res.json({
      message: "Test Route",
      status: true,
    });
  });

// < ============================================== MAIN ROUTES ============================================== >

//ANCHOR - CUSTOMER ROUTES ===================== >
router.get("/api/customer", CustomerController.GetAllCustomers)
router.get("/api/find/customer", CustomerController.GetCustomerByName)
router.post("/api/customer", CustomerController.AddCustomer)
router.delete("/api/customer", CustomerController.DeleteCustomer)

//ANCHOR - PRODUCT ROUTES ===================== >
router.get("/api/products", ProductController.GetAllProducts)
router.post("/api/products", ProductController.AddProduct)

//ANCHOR - SUPPLIER ROUTES ===================== >
router.get("/api/suppliers", SupplierController.GetAllSuppliers)
router.get("/api/find/suppliers", SupplierController.GetSupplierByName)
router.post("/api/suppliers", SupplierController.AddSupplier)

//ANCHOR - INVENTORY ROUTES ===================== >
router.get("/api/inventory", InventoryController.GetAllInventory)

//ANCHOR - FINANCIAL ELEMENT TYPE ROUTES ===================== >
router.get("/api/elem-types", FinancialElemTypeController.GetAllFinancialElemTypes)

//ANCHOR - TRANSACTION TYPE ROUTES ===================== >
router.get("/api/transaction-types", TransactionTypeController.GetAllTransactionTypes)

module.exports = router;