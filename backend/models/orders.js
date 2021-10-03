const mongoose = require("mongoose");
const User=require("./user");
const NewItem=require("./newitem");

const ordersschema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item_id: {  type: mongoose.Schema.Types.ObjectId, ref: "NewItem"  },
  isdeleted: { type: Boolean , default:false},
  status:{type:Boolean,default:false},
  date: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date
  }});

module.exports = mongoose.model("orders", ordersschema);