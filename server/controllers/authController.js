const userModel = require("../models/user");
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { sendOtp , verifyingOtp} = require("../utils/otpUtil");

const loginUser = async (req, res) => {
    try {

        const {crn, password} = req.body;
        if(!crn || !password){
            return res.status(400).json({message: "All input is required"});
        }

        const User = await userModel.findOne({crn: crn});
        
        if(!User){
            return res.status(400).json({message: "crn not found"});
        }

        if(User.password !== password){
            return res.status(400).json({message: "Password is incorrect"});
        }

        // const sendOtpResponse = await sendOtp(User.phone);
       
        // console.log(sendOtpResponse);
        // if(sendOtpResponse.status === 400){ 
        //     return res.status(400).json({message: sendOtpResponse.message, error: sendOtpResponse.error});
        // }

        // if(sendOtpResponse.error){
        //     return res.status(400).json({message: sendOtpResponse.message, error: sendOtpResponse.error});
        // }

        const token = jwt.sign({data: User._id}, process.env.JWT_SECRET);
        console.log(token);
        res.cookie('token', token, { maxAge: 3600000});

        return res.status(200).json({message: "Login Successfull"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

const verifyOtp = async (req, res) => {
   try {
    const {otp, phone} = req.body;

    if(!otp || !phone){
        return res.status(400).json({message: "All input is required"});
    }

    const response = await verifyingOtp(phone, otp);
    console.log(response);

    if(response.success === false){
        return res.status(400).json({message: "Enter the correct OTP"});
    }

    if(response.error === true){
        return res.status(400).json({message: response.message});
    }

    const getUser = await userModel.findOne({phone: phone});
    console.log(getUser);
    if(!getUser){
        return res.status(400).json({message: "User not found"});
    }

    const token = jwt.sign({data: getUser._id}, process.env.JWT_SECRET);
    
    res.cookie('token', token, {
       maxAge: 3600,
    })
    return res.status(200).json({message: "OTP verified successfully"});
    
   } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "Server Error" });
    
   }
};

module.exports = { loginUser, verifyOtp }