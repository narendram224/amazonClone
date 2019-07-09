const router = require('express').Router();
const aws = require('aws-sdk')
const multer = require('multer');
const multerS3 = require('multer-s3');
const checkjwt = require('../middleware/check-jwt');
const Product  = require('../routes/product');
const faker = require('faker');
const s3 = new aws.S3({accessKeyId:"AKIAQNYJSR7WRSTATALL",secretAccessKey:"LKgWj8tyIu2dU5o8bFny3wP+tpm1JvUedS45pS2z"});

const upload = multer({
    storage:multerS3({
        s3:s3,
        bucket:'pujax',
        metadata:(req,file,cb)=>{
            cb(null,{fieldName:file.fieldname});
        },
        key:(req,file,cb)=>{
            cb(null,Date.now().toString());
        },
    })
})


router.route('/products')
    .get(checkjwt,(req,res,next)=>{
        console.log(req.decoded.user._id);
            Product.find({owner:req.decoded.user._id})
            //     ,(req,prod)=>{
            //     res.send(prod);
            // }
            // )
             .populate('owner',)
            .populate('category')
            .exec((err,products)=>{
                if (products) {
                    res.status(200).json({
                        success:true,
                        message:"products getting",
                        products:products
                    })
                }
                else{
                    res.send(err);
                }
               
            })

    })
    .post([checkjwt,upload.single('product_picture')],(req,res,next)=>{
        let product  = new Product();

        product.owner = req.decoded.user._id;
        product.category = req.body.categoryId;
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        product.image = req.file.location;
        product.save();

        res.json({
            success:true,
            message:'succcessfully uploaded  '
        });

    });


    router.get('/faker/test',(req,res,next)=>{
        for (let i = 0; i < 20; i++) {
            let product   =  new Product();
            product.category= "5d1d80ad95950f064cadbcb0";
            product.owner = "5d1b7b9909ede018245ed4cb";
            product.image = faker.image.food();
            product.title = faker.commerce.productName();
            product.description   = faker.lorem.words();
            product.price = faker.commerce.price();
            product.save();
        }
        res.json({
            message:'succesfully added 20 products'
        })

    })
module.exports = router;