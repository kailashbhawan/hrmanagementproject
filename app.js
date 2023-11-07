const adminroutes = require("./src/routes/adminrouter")
const express = require("express")

const app = express()

app.use(express.json())
app.use("/admin", adminroutes);


app.listen(5000,() => {
  console.log("server run");
});