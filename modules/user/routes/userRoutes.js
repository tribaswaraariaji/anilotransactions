const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const passport = require("passport");
const responseFormatter = require("../../../responses/responses");
const { reqAuth } = require("../../../middleware/reqAuth");
const { isAdmin } = require("../../../middleware/isAdmin");


router.post("/login", userController.login);
router.get("/customer",reqAuth , isAdmin, userController.getCustomer);

module.exports = router;
