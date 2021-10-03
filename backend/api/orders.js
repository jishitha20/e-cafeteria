var express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
var orders= require("../models/orders.js");
var itemLib=require("../lib/itemlib");

router.get('/', function(req,res){
    let populateJson = {
        populate: { path: 'item_id' }
    }
    itemLib.getItemByQueryWithPopulate({} ,orders,"item_id user_id",function(err,data) {
        if(err){ res.status(400).json({msg:"Failed"}); }
        else {//console.log(data);
              res.status(200).json(data);}
    });
})
router.patch('/remove/:id',function(req,res)
{
    itemLib.updateItemField({_id:req.params.id},{status:true},orders,function(err,data){
        if(err){ res.status(400).json({msg:"Failed"}); }
        else {//console.log(data);
              res.status(200).json(data);}
    });
})
module.exports=router;