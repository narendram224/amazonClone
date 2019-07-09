const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    totalPrice:{type:Number,default:0},
    name:{
        type:String,
        unique:true,
        lowercase:true
    },
    created:{
        type:Date,
        default:Date.now
    },
    Product:[{
      product:{ type:Schema.Types.ObjectId,ref:"Product"} ,
      quantity:{type:Number,default:1}
    }]


});

module.exports = mongoose.model('Order',orderSchema);