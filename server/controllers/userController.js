const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const transferMonet = require('../helper/transferMonet');

const getAccount = async (req, res) => {
    try {
      const CookieToken = req.cookies.token;
      
      if(!CookieToken){
        return res.status(400).json({message: "Cookie is not set"});
      }

      console.log(CookieToken);
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

const transferMoney = async (req, res) => {
  try{
    const CookieToken = req.cookies.token;
    if(!CookieToken){
      return res.status(400).json({message: "Cookie is not set"});
      }

      const user = jwt.verify(CookieToken, process.env.JWT_SECRET);
      if(!user){
        return res.status(400).json({message: "User not logged in"});
      }

      const getUser = await userModel.findOne({ _id: user.data });

      if (!getUser) {
          return res.status(400).json({ message: "User not found" });
      }

      const senderAccount = getUser.account.accountNumber;

      const { amount, receiverAccount, receiverIfsc  } = req.body;

      if (!amount || !receiverAccount || !receiverIfsc) {
          return res.status(400).json({ message: "Please enter all fields" });
      }

      const Tranfer = await transferMonet(amount, senderAccount, receiverAccount);
      console.log(Tranfer);

      if(Tranfer.error){
        return res.status(400).json({message: Tranfer.message});
      }

      return res.status(200).json({message: Tranfer.message});
  }catch(error){
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

const getStatement = async (req, res) => {
  try{
    const CookieToken = req.cookies.token;
    if(!CookieToken){
      return res.status(400).json({message: "Cookie is not set"});
      }

      const user = jwt.verify(CookieToken, process.env.JWT_SECRET);
      if(!user){
        return res.status(400).json({message: "User not logged in"});
      }

      const getUserstatement = await userModel.findOne({ _id: user.data });

      if (!getUserstatement) {
          return res.status(400).json({ message: "User not found" });
      }

      const statement = getUserstatement.transaction;

      return res.status(200).json({message: "User found", statement: statement});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { getAccount, transferMoney, getStatement };