var express = require("express");
var router = express.Router();

// var masterjenisasetRouter = require("../modules/aset/routes/masterjenisasetRoutes");
var userRouter = require("../modules/user/routes/userRoutes");

// router.use("/aset", masterjenisasetRouter);
router.use("/user", userRouter);

module.exports = router;
