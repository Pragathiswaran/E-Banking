const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

const getAccount = async (req, res) => {
    try {
      const CookieToken = req.cookies.token;
      // console.log('cookies :',CookieToken);
      if(!CookieToken){
        return res.status(400).json({message: "Cookie is not set"});
      }
        const user = jwt.verify(CookieToken, process.env.JWT_SECRET);
        console.log(user);
      if(!user){
        return res.status(400).json({message: "User not logged in"});
      }
        const getUser = await userModel.findOne({ _id: user.data });
        console.log(getUser);
        if (!getUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const userDetails = {
            name: getUser.name,
            account: getUser.account.accountNumber,
            balance: getUser.account.balance,
            crn: getUser.crn,
            accountType: getUser.account.accountType,
        }
        return res.status(200).json({ message: "User found", user: userDetails });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports = { getAccount };