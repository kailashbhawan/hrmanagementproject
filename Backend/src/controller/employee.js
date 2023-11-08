
const empolyeeSchema = require("../model/empolyeeSchema");
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

class employeeController {
  //Employee list
  async getemployeelist(req, resp, next) {
    try {
      const result = await empolyeeSchema.find(); //{ isDeleted: false }

      if (result.length > 0) {
        resp.status(200).send({
          status: 200,
          message: "employee found successfully",
          data: result,
        });
      } else {
        resp.status(404).send({
          status: 404,
          message: "No employee found",
        });
      }
    } catch (error) {
      resp.status(500).send({
        status: 500,
        message: "Server Error",
        error: error.message,
      });
    }
  }

  //add employee
  async addEmployee(req, resp, next) {
    try {
      const { name, position, status } = req.body;

      const data = {
        name: name,
        position: position,
        status: status || "true",
      };
      let result = await empolyeeSchema.collection.insertOne(data);
      if (result) {
        resp.status(200).send({
          status: 200,
          message: "employee added successfully",
          data: [result],
        });
      } else {
        resp.status(500).send({
          status: 500,
          message: "Failed to add employee",
        });
      }
    } catch (error) {
      resp.status(500).send({
        status: 500,
        message: "An error occurred while adding the employee",
        error: error.message,
      });
    }
  }

  //update employee---------------
  async updateEmployeedata(req, resp, next) {
    try {
      const result = await empolyeeSchema.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );

      if (result) {
        resp.status(200).send({
          status: 200,
          message: "employee updated successfully",
          result: result,
        });
      } else {
        resp.status(404).send({
          status: 404,
          message: "employee not found",
        });
      }
    } catch (error) {
      resp.status(500).send({
        status: 500,
        message: "Server error",
      });
    }
  }
}

module.exports = new employeeController();
