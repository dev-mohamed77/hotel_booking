const router = require('express').Router();

const customer_controller = require("../controller/customer.controller");


router.get("/", customer_controller.get_customer_list);

router.post("/", customer_controller.add_customer);

router.put("/:id", customer_controller.updateCustomer);


module.exports = router;


