const mongoose=require("mongoose");

const ratingandreviewSchema=new mongoose.Schema({
   review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
})

module.exports=mongoose.model("ratingandreviewSchema",RatingandReview);
