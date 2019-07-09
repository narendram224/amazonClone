const express  =  require('express')
const jwt  =  require('jsonwebtoken')
const router = express.Router();
const checkJwt = require('../middleware/check-jwt');
const User  = require('../model/user');
const config = require('../configuration/congif');
const  Order  = require('../model/order');
router.post('/signup',(req,res,next)=>{
    // let userData = req.body;

    let user = new User();
    user.name = req.body.name;
    user.email =  req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;
                
    User.findOne({email:req.body.email},(err,existinguser)=>{
        if (existinguser) {
            res.json({
                success:false,
                message:"email is already exist"
            })
        }else{
            user.save((err,user)=>{
                if(err){
                    res.status(402).json({error:err,success:false});
                    console.log(req.body);
                }
                else{
                    //  creating token 
                    //  creating token 
                    var token  =  jwt.sign({
                        user:user,   
                    },config.secret,{
                        expiresIn:'7d'
                    });
                    res.json({
                        success:true,
                        message:'enjoy your token ',
                        token :token
                    });    
                    
                }
            });

           
        }
    })
});

// login routes

router.post('/login',async(req,res,next)=>{
        
        await User.findOne({email:req.body.email},(err,Loginuser)=>{
            if (err) {
                res.status(401).json({
                    error:err
                })
            }
             if(!Loginuser){
                res.status(401).json({message:"unauthorized access wrong password",
                success:false
            });

            }
            else if(Loginuser){
                    let validPassword = Loginuser.comparePassword(req.body.password);
                    if(!validPassword){
                        res.status(401).send("invalid password");
                    }
                    else{
                        // creating token for 7days
                        var token  =  jwt.sign({
                                user:Loginuser,   
                            },config.secret,{
                                expiresIn:'7d'
                            });
                
                        res.status(200).json({
                            success:true,
                            message:"authentication successsfully",
                            token
                        })
                    }
            }
        })
})


// creating same get and post method by one route ..this is done vio two method 1is here

// router.get('/profile')
// router.post('/profile') 2nd is here


 router.route('/profile')
    .get(checkJwt,(req,res,next)=>{

            User.findOne({_id:req.decoded.user._id},(err,user1)=>{
                    console.log(req.decoded.user._id);
                res.json({
                    success:true,
                    user:user1,
                    message:'succesfully profile show'
                });
                console.log(req.decoded.user);
            });
    })
    .post(checkJwt,(req,res,next)=>{
            User.findOne({_id:req.decoded.user._id},(err,user)=>{
                if (err) {
                    return next(err)
                } 
                if (req.body.name) user.name  = req.body.name;
                if(req.body.email) user.email  = req.body.email;
                if(req.body.password) user.password  = req.body.password;
                if(req.body.isSeller) user.isSeller  = req.body.isSeller;

                user.isSeller  = req.body.isSeller;

                user.save();
                res.json({
                    success:true,
                    message:'succesfully edited your profile'
                })
            })
    })


    // adddress api

    router.route('/address')
        .get(checkJwt,(req,res,next)=>{
                User.findOne({_id:req.decoded.user._id},(err,user)=>{
                    if (err) {
                        return next(err)
                    }
                    else{
                        res.status(200).json({
                            success:true,
                            address:user.address,
                            message:"data received"
                        });
                    }
                })
        })
        .post(checkJwt,(req,res)=>{
            User.findOne({_id:req.decoded.user._id},(err,user)=>{
                    if (err) {
                        return next(err)
                    }
                    if(req.body.addr1) user.address.addr1 = req.body.addr1;
                    if(req.body.addr2) user.address.addr2  = req.body.addr2;
                    if(req.body.state) user.address.state  = req.body.state;
                    if(req.body.city) user.address.city  = req.body.city;
                    if(req.body.country) user.address.country  =req.body.country;
                    if(req.body.postalCode) user.address.postalCode  = req.body.postalCode;

                    user.save();
                    res.status(200).json({
                        success:true,
                        address:user.address,
                        message:"address is updated successfully"
                    })

            })
        })


        // order api 

        router.get('/orders',checkJwt,(req,res,next)=>{
        Order.find({owner:req.decoded.user._id})
        .populate('products.product')
        .populate('owner')
        .exec((err,orders)=>{
                if (err) {
                    res.json({
                        success:true,
                        message:"Couldn't find any error"
                    });
                }else{
                    res.json({
                        success:true,
                        message:'Found the order',
                        orders:orders
                    })
                }

        })
        })
module.exports =  router;
