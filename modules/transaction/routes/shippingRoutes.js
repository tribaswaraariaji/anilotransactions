const express = require("express");
const router = express.Router();
const shippingController = require("../controller/shippingController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");
const { isAdmin } = require("../../../middleware/isAdmin");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Data Shipping");
});

router.get("/shipping", reqAuth, shippingController.get);

router.get("/shipping/id", reqAuth, shippingController.getByID);

router.post("/shipping", reqAuth, isAdmin, shippingController.create);

router.put("/shipping", reqAuth, isAdmin, shippingController.update);

module.exports = router;
