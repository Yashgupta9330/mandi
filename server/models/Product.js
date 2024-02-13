const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    productDescription:{
        type:String,
        trim:true
    },
    Owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    RatingandReviews:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingandReview"
    },
    buyers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },
    thumbnail:{
        type:String
    }

})

module.exports=mongoose.model("Product",productSchema);
