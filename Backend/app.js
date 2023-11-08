const connection = require("./connection")
const adminRoutes = require("./src/routes/adminrouter")
const employeeRoutes = require("./src/routes/employeerouter");
const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())
app.use("/admin", adminRoutes);
app.use("/employee", employeeRoutes);


app.listen(5000,() => {
  console.log("server run");
});