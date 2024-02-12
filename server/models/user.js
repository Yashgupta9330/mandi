const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin","Farmer","Buyer"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    Products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    image:{
        type:String,
        required:true
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }
})

module.exports=mongoose.model("User",userSchema);
