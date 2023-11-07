const admincontroller = require("../controller/admincontroller");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

const verifyToken = (req, resp, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, vaild) => {
      if (err) {
        resp.status(401).send({ result: "please provide vaild token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "please add token with headers" });
  }
};
