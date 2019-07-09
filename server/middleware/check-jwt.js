const jwt  = require('jsonwebtoken');
const config = require('../configuration/congif');

// module.exports = (req,res,next)=>{
//     let token = req.headers['authorization'];

//     if (token) {
//            jwt.verify(token,config.secret, async(err,decoded)=>{
//                if (err) {
//                    res.json({
//                        success:false,
//                        message:"failed to authorized token"
//                    })
//                } else {
//                     req.decoded = await decoded;
                   
//                     next();
//                      console.log(req.decoded);
                    
//                }
//            })
//     } else {
//             res.status(403).json({
//                 success:false,
//                 message:"no toekn provided"  
//             })
//     }
// }


// module.exports = (req,res,next)=>{
//     if(!req.headers.authorization){
//        return res.status(401).send('unathorized')
//     }
//     let token = req.headers.authrization.split(' ')[1]
            

//         if(token ==='null'){
//             return res.status(401).send('unauthorized request')
//         }
//         let payload = jwt.verify(token,'secretKey')
//         if(!payload){
//             return res.status(401).send('unauthorized request')
//         }
//         req.userId = payload.subject
//         next()
    
// }



// module.exports  = (req,res,next)=>{
// 	try{
// 		const token = req.headers.authrization.split(" ")[1];
// 		const decoded = jwt.verify(token,config.secret);
// 		req.userData  = decoded;
// 		next();

// 	}catch(error){
// 		return res.status(401).json({
// 			message:"authrization  failed"
// 		})

// 	}
// }


module.exports = function(req,res,next){
    let token  = req.headers['authorization'];
    if (token) {
            jwt.verify(token,config.secret,(err,decoded)=>{
                if (err) {
                    res.json({
                        success:false,
                        message:"failed to authentication"
                    })
                }else{
                    req.decoded = decoded;
                    next();
                }
            })
    }else{
        res.status(403).json({
            success:false,
            message:"no toekn provided"
        })
    }
}