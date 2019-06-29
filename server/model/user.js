const mongoose  = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto =  require('crypto')
const Userschema = new Schema({
    email:{
            type:String,
            unique:true,
            lowercase:true
    },
    name:String,
    password:{
        type:String,
        maxlength:15,
        required:true,
    },
    picture:String,
    isSeller:{type:Boolean,default:false},
    address:{
        addr1:String,
        addr2:String,
        city:String,
        state:String,
        country:String,
        postalCode:String
    },
    created:{type:Date,default:Date.now}
});
// this pre function do encryption before saving the password into database
Userschema.pre('save',async function(next){
    var user  =this;
    console.log(user.password);
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password,null,null,(err,hash)=>{       
        if (err) {
            return next(err);
        }
       user.password = hash;
        next();
       
    })
})



// creating the custom function that compare the 
// password that user enter and  form the database
// password mean we type .. this.password mean databas encripted password
Userschema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

Userschema.methods.gravatar = (size)=>{
     if(!this.size) size = 200;
     if(!this.email)
     {
         return 'https://gravatar.com/avatar/?s' + size + '&d = retro';
        }
     else{
        var md5  = crypto.createHash('md5').update(this.email).digest('hex');
        return 'https://gravatar.com/avatar/'+md5+ '?s' +size+ '&d=retro'; 
     } 
    }

    module.exports = mongoose.model('User',Userschema);

