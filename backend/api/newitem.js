var express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
var newitem= require("../models/newitem.js");

router.get('/', function(req,res){
    newitem.find({}, function (err, data) {
        if(err){ res.status(400).json({msg:"Failed"}); }
        else {//console.log(data);
              res.status(200).json(data);}
    });
})

router.post('/add', function(req,res){
    console.log("hello");
    data={ _id: new mongoose.Types.ObjectId(),

           name : req.body.name,
           url : req.body.url,
           price : req.body.price,
        }; console.log(data);
    var add= new newitem(data);
    add.save(function(err, data) {
        if(err){
          res.status(400).json({msg:"Failed to Created Insatnce"});} 
          else {
          res.status(200).json({msg:"Saved Successful"});
          console.log(data);
        }
      });
})

router.patch('/mark', function(req,res){
  console.log(req.body._id)
  newitem.find({_id:req.body._id}, function (err, data) {
   if(err){ res.status(400).json({msg:"Failed"}); }
   else { console.log(data);
          newitem.updateOne({ _id:req.body._id }, {url: false}, (err,data)=>
          {
           if(err){ res.status(400).json({msg:"Failed to Update"}); }
               else { 
                   //console.log(data);
                   res.status(200).json({msg:"Updated"});}
          }
          );
         }
});
})

router.patch('/remove/:id', function(req,res){
    console.log(req.params.id);
   newitem.find({_id:req.params.id}, function (err, data) {
    if(err){ res.status(400).json({msg:"Failed"}); }
    else { 
        //console.log(data);
           newitem.updateOne({ _id:req.params.id }, {isdeleted: true}, (err,data)=>
           {
            if(err){ res.status(400).json({msg:"Failed to Update"}); }
                else { 
                    console.log("succeded");
                    res.status(200).json({msg:"Updated"});}
           }
           );
          }
});
})

// router.patch('/remove', function(req,res){
//   console.log(req.body._id)
//    newitem.replaceOne({ _id:req.body._id }, { price: true },(err,data)=>{
//     if(err){ res.status(400).json({msg:"Failed to Update"}); }
//     else { 
//         //console.log(data);
//         res.status(200).json({msg:"Updated"});}
//   });
// })

module.exports=router;