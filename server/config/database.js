const mongoose=require("mongoose");
require("dotenv").config();

exports.connect=()=>{
   mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
   }).then(()=>{
    console.log("database connected successfully");
   }).catch((error)=>{
     console.error(error);
     console.log("db connection failed");
     process.exit(1);
   })
};