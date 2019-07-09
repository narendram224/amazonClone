const router = require('express').Router();
const categorySchema = require('../model/category');
const Product = require('../routes/product');
const async = require('async');
const checkJwt = require('../middleware/check-jwt');
const Review  = require('../model/review');
const stripe = require('stripe')('sk_test_qcXgwY3fEA5jVuhAv5E4s17i00FNXJRcPq');
// product main api

router.get('/products',(req,res,next)=>{
    const perPage = 10;
    const page =  req.query.page;

// Parallel function is optimize s we chnge some code in whterfall function

async.parallel([
        function (callback) {
            Product.countDocuments({},(err,count)=>{
                var totalProducts = count;
                callback(err,totalProducts);
            });
        } ,
        function(callback){
            Product.find({})
            .skip(perPage*page)
            .limit(perPage)
            .populate('category')
            .populate('owner')
            .exec((err,products)=>{
                if (err) {
                    return next(err);
                }
                callback(err,products);
            })
        }

    ],function(err,results){
        var totalProducts = results[0];
        var products = results[1];
        
        
        res.json({
                        success:true,
                        message:'category',
                        products,
                        totalProducts:totalProducts,
                        page:Math.ceil(totalProducts/perPage)
                    });

    });

});

router.route('/categories')
    .get((req,res,next)=>{
            categorySchema.find({},(err,categories)=>{
                res.json({
                    success:true,
                    message:'success',
                    categories:categories 
                })
                // console.log(categories);
            })
    })
    .post((req,res,next)=>{
        let category = new categorySchema();
            category.name = req.body.category;
            category.save((err,cat)=>{
                if (err) {
                    res.send(err)
                }else{
                    res.send(cat);
                }
            });
            // res.json({
            //     success:true,
            //     message:"succcessfull"
            // })
    })

//  In this prodblem there3 major prolem
    router.get('/categories/:id',(req,res,next)=>{
        const perPage = 10;
        const page =  req.query.page;

// Parallel function is optimize s we chnge some code in whterfall function

  async.parallel([
            function (callback) {
                Product.countDocuments({category:req.params.id},(err,count)=>{
                    var totalProducts = count;
                    callback(err,totalProducts);
                });
            } ,
            function(callback){
                Product.find({category:req.params.id})
                .skip(perPage*page)
                .limit(perPage)
                .populate('category')
                .populate('owner')
                .populate('reviews')
                .exec((err,products)=>{
                    if (err) {
                        return next(err);
                    }
                    callback(err,products);
                })
            },
            function(callback){
                categorySchema.findOne({_id:req.params.id},(err,category)=>{
                   callback(err,category)
                })
            },

        ],function(err,results){
            var totalProducts = results[0];
            var products = results[1];
            var category = results[2];
            
            res.json({
                            success:true,
                            message:'category',
                            products,
                            categoryName:category.name,
                            totalProducts:totalProducts,
                            page:Math.ceil(totalProducts/perPage)
                        });

        });



// waterfall functuon will not execte parellel so we use parrele function to optimize the code and enhance functuonality
        // async.waterfall([
        //     function (callback) {
        //         Product.countDocuments({category:req.params.id},(err,count)=>{
        //             var totalProducts = count;
        //             callback(err,totalProducts);
        //         });
        //     } ,
        //     function(totalProducts,callback){
        //         Product.find({category:req.params.id})
        //         .skip(perPage*page)
        //         .limit(perPage)
        //         .populate('category')
        //         .populate('owner')
        //         .exec((err,products)=>{
        //             if (err) {
        //                 return next(err);
        //             }
        //             callback(err,products,totalProducts);
        //         })
        //     },
        //     function(products,totalProducts,callback){
        //         categorySchema.findOne({_id:req.params.id},(err,category)=>{
        //             res.json({
        //                 success:true,
        //                 message:'category', 
        //                 products,
        //                 categoryName:category.name,
        //                 totalProducts:totalProducts,
        //                 page:Math.ceil(totalProducts/perPage)
        //             })
        //         })
        //     }

        // ]);



        // this approach having the 3 error which is not fasible for more data
        // Product.find({category:req.params.id})
        // .populate('category')
        // .exec((err,product)=>{
        //     Product.count({category:req.param.id},(err,totalProducts)=>{
        //         res.json({
        //             success:true,
        //             message:'category',
        //             categoryName:product[0].category.name,
        //             totalProducts:totalProducts,
        //             page:Math.ceil(totalProducts/perPage)
        //         });
        //     });
        // });
    }
    );

    router.get('/products/:id',(req,res,next)=>{
        Product.findById({_id:req.params.id})
        .populate('category')
        .populate('owner')
        .deepPopulate('reviews.owner')
        .exec((err,product)=>{
            if (err) {
                res.json({
                    success:false,
                    message:"product not found"
                })
            } else {
                if (product) {
                    res.json({
                        success:true,
                        product:product
                    })
                }
            }
        })
    })


    router.post('/review',checkJwt,(req,res,next)=>{
        async.waterfall([
            (callback)=>{
                Product.findOne({_id:req.body.productId},(err,  product)=>{
                    if (product) {
                        callback(err,product);
                    }
                })
            },
            (product)=>{
                let review = new Review();

                review.owner = req.decoded.user._id;

                if(req.body.title) review.title = req.body.title;
                if(req.body.description) review.description = req.body.description;
                review.rating = req.body.rating;

                product.reviews.push(review._id);
                product.save();
                review.save();
                res.json({
                    success:true,
                    message:'successfully added to review'
                });
                 
            }
        ])
    })
    module.exports  = router;

    // async mathod do the waterfall whenever one function not giving callback secod will not run

     