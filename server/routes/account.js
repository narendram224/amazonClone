const express  =  require('express')
const jwt  =  require('jsonwebtoken')
const router = express.Router();

const User  = require('../model/user');
const config = require('../configuration/congif')
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
        let user = new User();
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
                                user:user,   
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

module.exports =  router;
