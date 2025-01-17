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
        console.log(User)
        if(!User){
            return res.status(400).json({message: "crn not found"});
        }

        if(User.password !== password){
            return res.status(400).json({message: "Password is incorrect"});
        }

        const sendOtpResponse = await sendOtp(User.phone);
        console.log(sendOtpResponse);
        // if(!sendOtpResponse){ 
        //     return res.status(400).json({message: "Failed to send OTP"});
        // }

        return res.status(200).json({message: "Login Successfull"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

const verifyOtp = async (req, res) => {
   try {
    const {otp, phone} = req.body;

    const response = await verifyingOtp(phone, otp);
    console.log(response);
    if(!response){
        return res.status(400).json({message: "Failed to verify OTP"});
    }

    res.status(200).json({message: "OTP verified successfully"});
    
   } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "Server Error" });
    
   }
};

// Call the function with the phone number and OTP code provided by the user



module.exports = { loginUser, verifyOtp }