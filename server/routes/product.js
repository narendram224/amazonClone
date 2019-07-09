const mongoose = require('mongoose')
const Schema  =  mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const mongooseAlgolia = require('mongoose-algolia');
const productSchema = new Schema({
    category:{type:Schema.Types.ObjectId,ref:'Category'},
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    reviews:[{type:Schema.Types.ObjectId,ref:'Review'}],
    image:String,
    title:String,
    description:String,
    price:Number,
    created:{
        type:Date,
        default:Date.now
    },

},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});

// crerating avearage rating method 

productSchema
.virtual('averageRating')
.get(function(){
    var rating = 0;
    if (this.reviews.length == 0) {
        rating = 0
    }else{
        this.reviews.map((review)=>{
            rating+=review.rating;
        });
        rating = rating/this.reviews.length;
    }
    return rating;
});

productSchema.plugin(deepPopulate); 
productSchema.plugin(mongooseAlgolia,{
    appId:'app code',
    apiKey:'api key of alogolia ',
    indexName:'amazonClone',
    selector:'_id title description price owner image review created averageRating',
    populate:{
        path: 'owner reviews',
        selec:'name rating'
    },
    default:{
            author:'unkhown',
    }, 
    mappings:{
            title:function(value){
                return `${value}`
            }
    },
    virtuals:{
            averageRating:function(doc){
                var rating = 0;
                if (doc.reviews.length == 0) {
                    rating = 0
                }else{
                    doc.reviews.map((review)=>{
                        rating+=review.rating;
                    });
                    rating = rating/doc.reviews.length;
                }
                return rating;
            }
    },
    debug:true
})

let Model = mongoose.model('Product',productSchema);

    Model.SyncToAlgolia();
    Model.SetAlgoliaSettings({
        searchableAttributes:['title']
    });

module.exports = Model;
