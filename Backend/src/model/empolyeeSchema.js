const mongoose = require("mongoose")

const empolyeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "true", 
  },
});

module.exports = mongoose.model("employee", empolyeeSchema);