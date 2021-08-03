const express = require("express");
const router = express.Router();
const ordersController = require("../controller/ordersController")
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");
const { isAdmin } = require("../../../middleware/isAdmin");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Data Order");
});

router.get("/order", reqAuth, ordersController.get);

router.post("/order", reqAuth, ordersController.create);

// router.put("/order", reqAuth, isAdmin, ordersController.update);

router.put("/order/update-payment", reqAuth, ordersController.updatePayment);

router.put("/order/update-status", reqAuth, isAdmin, ordersController.updateStatus);

module.exports = router;
