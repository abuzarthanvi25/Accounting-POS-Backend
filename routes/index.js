let express = require("express");
let router = express.Router();
const CustomerController = require("../controllers/CustomerController")

//NOTE - TEST ROUTE
router.post("/", (req, res) => {
    res.json({
      message: "Test Route",
      status: true,
    });
  });



//ANCHOR - CUSTOMER ROUTES
// router.get("/api/customer", CustomerController.GetAll)
router.get("/api/customer", CustomerController.GetAllCustomers)
router.get("/api/find/customer", CustomerController.GetCustomerByName)
router.post("/api/customer", CustomerController.AddCustomer)
router.delete("/api/customer", CustomerController.DeleteCustomer)



module.exports = router;