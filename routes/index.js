var express = require("express");
var router = express.Router();

var userRouter = require("../modules/user/routes/userRoutes");
var productRouter = require("../modules/transaction/routes/productRoutes");
var orderRouter = require("../modules/transaction/routes/ordersRoutes");
var shippingRouter = require("../modules/transaction/routes/shippingRoutes");

router.use("/transaction", productRouter,orderRouter,shippingRouter);
router.use("/user", userRouter);

module.exports = router;
