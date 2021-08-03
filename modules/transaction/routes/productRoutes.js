const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");
const { isAdmin } = require("../../../middleware/isAdmin");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Data Master Tipe Aset");
});

router.get("/product", reqAuth, productController.get);

router.put("/product", reqAuth, isAdmin, productController.update);

module.exports = router;
