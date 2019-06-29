
const mongoose  = require('mongoose');
const config  = require('./congif');
// creating the database connection 
mongoose.connect(config.database,{useNewUrlParser:true},(err)=>{
    if(err){
        console.log("database not connected successfull ",err);
    }
    else{
        console.log("database is connected successfully");
    }
})

module.exports = mongoose;