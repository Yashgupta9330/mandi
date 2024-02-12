const user=require("../models/user");
const OTP=require("../models/OTP");

    exports.sendOtp=async(req,res)=>{
        try{
            const {email}=req.body;
            const checkuserpresent=await user.findOne({email});
            if(checkuserpresent){
                return res.status(401).json({
                 success:true,
                 message:"user already registered"
                })
            }
            var otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            const result=await OTP.findOne({otp});
            while(result){
                otp=otpGenerator.generate(6,{
                    upperCaseAlphabets:false,
                    lowerCaseAlphabets:false,
                    specialChars:false
                })
                 result=await OTP.findOne({otp});
            }
            const otpPayload={email,otp};
            const otpbody=await OTP.create(otpPayload);
            console.log(otpbody);
            res.status(200).json({
                success:true,
                message:"OTP SENT SUCCESSFULLY"
            })        
        }
  
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
    
}

exports.signUp=async(req,res)=>{
     try{
      const {firstName,lastName,password,confirmPassword,contactNumber,email,otp,accountType}=req.body;
          if(!firstName||!lastName || !password || !confirmPassword || !contactNumber || !email || !otp ){
            return res.status(403).json({
                success:false,
                message:"All field necessary",
            })
          }
          if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password do not match",
            })
          }
          const checkuserpresent=await user.findOne({email});
          if(checkuserpresent){
              return res.status(401).json({
               success:true,
               message:"user already registered"
              })
          }
          const recentotp=await otp.find({email}).sort({createdAt:-1}).limit(1);
          consoel.log(recentotp);
          if(recentotp.length==0){
            return res.status(400).json({
                success:false,
                message:"otp not found",
            })
          }
        if(otp!=recentotp){
            return res.status(400).json({
                success:false,
                message:"invalid otp",
            })
        }
        const hashedPassword=await brycpt.hash(password,10);
        const profiledetails=await Profile.create({
            gender:null,
            dateofbirth:null,
            about:null,
            contactnumber:contactNumber
        })
        const User=await user.create({
            firstName,
            lastName,
            password:hashedPassword,
            accountType,
            email,
            additionalDetails:profiledetails._id,
            image:`https://api.dicebear.com/7.x/initials/svg?seed=${firstName} {lastName}`
        })
        return  res.status(200).json({
               success:true,
               message:"user registered successfully"
            })
        
     }
     catch(error){
         console.log(error);
         return res.status(500).json({
             success:false,
             message:"there is problem in user registeration"
         })
     }
}


exports.login = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const User = await user.findOne({ email }).populate("additionalDetails");

		// If user not found with provided email
		if (!User) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, User.password)) {
			const token = jwt.sign(
				{ email: user.email, id: User._id, accountType: user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			User.token = token;
			User.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				User,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};