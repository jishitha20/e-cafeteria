const mongoose = require("mongoose");

const itemschema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  url: { type: String, required:true },
  price: { type: Number , required:true },
  isdeleted:{type:Boolean,default:false},
});

module.exports = mongoose.model("NewItem", itemschema);