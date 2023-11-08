const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employee");
const verifyToken = require("../middleware/tokenverifey");
// const adminSchema = require("../model/adminSchema");

router.get("/list",verifyToken,  employeeController.getemployeelist);
router.post("/add",verifyToken, employeeController.addEmployee);
router.put("/update/:id",verifyToken,  employeeController.updateEmployeedata);

module.exports = router;
