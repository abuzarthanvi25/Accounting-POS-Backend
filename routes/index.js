let express = require("express");
let router = express.Router();
const CustomerController = require("../controllers/CustomerController")
const ProductController = require("../controllers/ProductController")
const SupplierController = require("../controllers/SupplierController")
const InventoryController = require("../controllers/InventoryController")
const FinancialElemTypeController = require("../controllers/FinancialElemTypeController")
const TransactionTypeController = require("../controllers/TransactionTypeController")
const OrderController = require("../controllers/OrderController")
const OrderItemsController = require("../controllers/OrderItemsController");
const SalesController = require('../controllers/SalesController');
const GeneralJournalController = require('../controllers/GeneralJournalController');

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
router.get("/api/marketplace/products", ProductController.GetMarketPlaceProducts)
router.post("/api/products", ProductController.AddProduct)

//NOTE - SUPPLIER ROUTES ===================== >
router.get("/api/suppliers", SupplierController.GetAllSuppliers)
router.get("/api/find/suppliers", SupplierController.GetSupplierByName)
router.post("/api/suppliers", SupplierController.AddSupplier)

//NOTE - INVENTORY ROUTES ===================== >
router.get("/api/inventory", InventoryController.GetAllInventory)
router.post("/api/add-products/inventory", InventoryController.AddProductsToInventory)

//NOTE - FINANCIAL ELEMENT TYPE ROUTES ===================== >
router.get("/api/elem-types", FinancialElemTypeController.GetAllFinancialElemTypes)
router.get("/api/single/elem-types", FinancialElemTypeController.GetFinancialElemTypeById)

//NOTE - TRANSACTION TYPE ROUTES ===================== >
router.get("/api/transaction-types", TransactionTypeController.GetAllTransactionTypes)

//NOTE - ORDER ROUTES ===================== >
router.get("/api/orders", OrderController.GetAllOrders)
router.post("/api/orders", OrderItemsController.CreateAnOrder)

//NOTE - ORDER ITEM ROUTES ===================== >
router.get("/api/order-items", OrderItemsController.GetFullOrder)

//NOTE - SALES ROUTES ===================== >
router.get("/api/sales", SalesController.GetAllSales)
router.get("/api/product/sales", SalesController.GetSalesByProductId)
router.get("/api/order/sales", SalesController.GetSalesByOrderId)

//NOTE - GENERAL JOURNAL ROUTES ===================== >
router.get("/api/journal", GeneralJournalController.GetAllJournalEntries)
router.post("/api/journal", GeneralJournalController.AddJournalEntry)
router.get("/api/fat/journal", GeneralJournalController.GetEntriesByFinancialElemType)
router.get("/api/date/journal", GeneralJournalController.GetEntriesByDate)
router.get("/api/income-summary/journal", GeneralJournalController.GenerateIncomeStatement)
router.get("/api/balance-sheet/journal", GeneralJournalController.GenerateBalanceSheet)
router.get("/api/owners-equity/journal", GeneralJournalController.GenerateStatementOfOwnersEquity)

module.exports = router;