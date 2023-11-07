const  connection = require("../model/connection")
const  adminSchema = require("../model/adminSchema")
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";


class adminController {
    //signup admin
  async signup(req, resp) {
    const { name, email, mobileNo, password } = req.body;

    try {
      const existsMail = await adminSchema.findOne({ email: email });
      if (existsMail) {
        return resp.status(400).json({
          message: "Email already exists",
        });
      }

      const existsMobileNumber = await adminSchema.findOne({
        mobileNo: mobileNo,
      });
      if (existsMobileNumber) {
        return resp.status(400).json({
          message: "Mobile number already exists",
        });
      }

      const result = await adminSchema.create({
        name,
        email,
        mobileNo,
        password,
      });

      if (result) {
        return resp.status(201).json({
          status: 201,
          message: "Signup successfully",
          data: result,
        });
      }
    } catch (error) {
      return resp.status(500).json({
        status: 500,
        message: "Internal server error",
        data: ["Error during signup:", error],
      });
    }
  }

  //login Admin
  async login(req, resp) {
    try {
      const check = await adminSchema.findOne({ email: req.body.email });

      if (!check) {
        return resp.status(401).send({
          status: 401,
          Message: "User not found",
        });
      }

      if (check.password === req.body.password) {
        jwt.sign(
          { adminSchema : check },
          jwtKey,
          { expiresIn: "24h" },
          (error, token) => {
            if (error) {
              resp.status(500).json({
                status: 500,
                Message: "Token creation failed",
              });
            } else {
              resp.status(200).json({
                user: check,
                auth: token,
                status: 200,
                Message: "Welcome, you are logged in",
                data: check,
              });
            }
          }
        );
      } else {
        resp.status(401).json({
          status: 401,
          Message: "Wrong password",
        });
      }
    } catch (error) {
      resp.status(500).json({
        status: 500,
        Message: "Server error",
        error: error.message,
      });
    }
  }
}





module.exports = new adminController();