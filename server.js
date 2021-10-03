// import or include statement for express
var express=require('express');
// create application 
var app= express();

const dbURI = process.env.dbURI||"mongodb+srv://jishi:lVipdVaU7EZaYQFJ@cluster0.rbcv3.mongodb.net/test";const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname+'/frontend'));
const Razorpay=require("razorpay");

const razorpay=new Razorpay({
    key_id:"rzp_test_QJ6Y7G3p1zOqrc",
    key_secret:"L4hBgXCAhj5bviskr9OV5A2m"

});
mongoose
    .connect(dbURI, {
        
        useNewUrlParser: true,
      
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
    const itemLib = require("./backend/lib/itemlib");
    const ordermodel=require("./backend/models/orders");

// defining function that runs when someone access our site
app.get('/',function(req,res){
       // when someone opens our page open this html page 
          res.sendFile(__dirname+'/frontend/html/home.html');
});
app.get('/register',function(req,res){
       // when someone opens our page open this html page 
       res.sendFile(__dirname+'/frontend/html/regvs.html');
});
app.get('/login',function(req,res){
       // when someone opens our page open this html page 
          res.sendFile(__dirname+'/frontend/html/loginvs.html');
});
app.get('/Menu',function(req,res){
    // when someone opens our page open this html page 
       res.sendFile(__dirname+'/frontend/html/menu.html');
});
app.get('/gallery',function(req,res){
    // when someone opens our page open this html page 
       res.sendFile(__dirname+'/frontend/html/gallery.html');
});
app.get('/todo',function(req,res){
    // when someone opens our page open this html page 
       res.sendFile(__dirname+'/frontend/html/todo.html');
});
app.get('/contact',function(req,res){
    // when someone opens our page open this html page 
       res.sendFile(__dirname+'/frontend/html/contact.html');
});

app.use("/api", require("./backend/api/allapi.js"));
//tell express where html,css,js files are
app.post("/order",(req,res)=>
{
    var options = {
        amount: 100,  
        currency: "INR"
      };
      razorpay.orders.create(options, function(err, order) {
        console.log(order,err);
        res.json(order);
      });
})

app.post("/is-order-complete/:itemid/:userid",(req, res)=>
{
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((doc)=> {
        if(doc.status=="captured"){
            
            const userid=req.params.userid;
            const itemid=req.params.itemid;
            
            itemLib.createitem({  _id: new mongoose.Types.ObjectId(),
                user_id:userid,item_id:itemid,status:false},ordermodel,(error,result)=>{
                if(error)
                {
                    res.status(500).json({
                        error: error,
                    });
                }
                else{
                    res.send("Payment Successful!!")
                }
            });
        }
        else
        res.redirect("/");
    })
})
var port=process.env.PORT ||3000;
 
app.listen(port,function(){
       console.log("Port is listening");
});