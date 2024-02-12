const jwt=require("jsonwebtoken");
require("dotenv").config();
const user=require("../models/user");

exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token||req.body.token||req.header("Authorisation").replace("Bearer","");
        if(!token){
            return res.status(401).json({
               success:false,
               message:"token is missing"
            })
        }
         try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
         }
         catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
             })
         }
         next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrong while validating the token"
         })
    }
}


exports.isBuyer = async (req, res, next) => {
 try{
        if(req.user.accountType !== "Buyer") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        next();
 }
 catch(error) {
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
 }
}


//isInstructor
exports.isFarmer = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Farmer") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Instructor only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{    
           console.log("Printing AccountType ", req.user.accountType);
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }