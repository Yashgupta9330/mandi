const mongoose=require("mongoose");

const tagSchema=new mongoose.Schema({
   name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Products:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    }],
})

module.exports=mongoose.model("tagSchema",Tag);
