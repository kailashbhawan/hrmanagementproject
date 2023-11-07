const adminController = require("../controller/admincontroller");
const tokenverify = require("../middleware/tokenverifey");
const express = require("express");
const router = express.Router();

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);

module.exports = router;
