var express = require('express');
const app = express.Router();
var todo= require('./todo.js');
var user=require('./user.js');
var item=require('./newitem.js');
var orders=require('./orders.js');

app.use("/todo",todo);
app.use("/user",user);
app.use("/new",item);
app.use("/orders",orders);
module.exports=app;