const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const itemLib = require("../lib/itemlib");
const userModel=require("../models/user.js");
router.post("/signup", (req, res) => {
    console.log(req.body);
    itemLib.getItemByQuery({ email: req.body.email }, userModel, (err, user) => {
        if (err) {
            res.status(500).json({
                error: err.toString(),
            });
        } else {
            if (user.length >= 1) {
                res.status(409).json({
                    message: "Email already exists",
                });
            } else {

                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = {
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            mobileNumber: req.body.mobileNumber,
                            isEmailVerified: false,
                            userType:req.body.userType,
                            

                        };



                        itemLib.createitem(user, userModel, async(err, result) => {
                            if (err) {
                                res.status(500).json({
                                    error: err,
                                });
                            } else {

                                        res.status(201).json({
                                            message: "user created",
                                            userDetails: {
                                                userId: result._id,
                                                userType:result.userType,
                                                email: result.email,
                                                name: result.name,
                                                mobileNumber: result.mobileNumber,
                                                
                                            },
                                        });
                                    }
                            });
                    }
                   
                });
            }
        }
    })

})
                    router.post("/login", (req, res) => {
                        itemLib.getItemByQuery({ email: req.body.email }, userModel, (err, user) => {
                            if (err) {
                                res.status(500).json({
                                    error: err,
                                });
                            } else {
                                if (user.length < 1) {
                                    return res.status(401).json({
                                        message: "Auth failed: Email not found probably",
                                    });
                                }
                                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                                    if (err) {
                                        return res.status(401).json({
                                            message: "Auth failed",
                                        });
                                    }
                                    if (result) {
                                        const token = jwt.sign({
                                                userType: user[0].userType,
                                                userId: user[0]._id,
                                                email: user[0].email,
                                                name: user[0].name,

                                                mobileNumber: user[0].mobileNumber,
                                               
                                            },
                                            process.env.jwtSecret, {
                                                expiresIn: "1d",
                                            }
                                        );
                    
                                        return res.status(200).json({
                                            message: "Auth successful",
                                            userDetails: {
                                                userType: user[0].userType,
                                                userId: user[0]._id,
                                                name: user[0].name,
                                                email: user[0].email,
                                                mobileNumber: user[0].mobileNumber,
                                                
                                            },
                                            token: token,
                                        });
                                    }
                                    res.status(401).json({
                                        message: "Auth failed1",
                                    });
                    
                                })
                            }
                        })
                    })
                    module.exports = router