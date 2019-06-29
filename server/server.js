// importing the module
const express =  require('express')
const morgan  = require('morgan')
const bodyParser  = require('body-parser')
const cors =  require('cors')
const config =  require('./configuration/congif')
const userRoutes = require('./routes/account');

 const database = require('./configuration/dbConnection');
const app  = express()

// this section is for middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(cors());
// this section is working

// creating routes for api
app.get('/',(req,res)=>{
        res.json({"name":"shubh"});
})

app.use('/api/accounts',userRoutes);
// create listing on port 
app.listen(config.port,()=>{
    console.log("server is running on :",config.port);
})