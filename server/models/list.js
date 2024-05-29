const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: {
    type: "String",
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const listModel = mongoose.model("list", listSchema);

module.exports = listModel;
