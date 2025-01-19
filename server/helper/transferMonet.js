const UserModel = require('../models/user');
const moment = require('moment');
const jwt = require('jsonwebtoken'); 

const transferMonet = async (amount, senderId, receiverId) => {
   try {
    const sender = await UserModel.findOne({"account.accountNumber": senderId});
    const receiver = await UserModel.findOne({"account.accountNumber": receiverId});

    if(!sender || !receiver){
      return {error: true, message: "User not found"};
    }

    if(sender.account.balance < amount){
      return {error: true, message: "Insufficient balance"};
    }

    sender.account.balance -= amount;

    receiver.account.balance += amount;

    sender.transaction.push({
        transactionId: receiver.account.accountNumber,
        transactionAmount: amount,
        transactionType: "Debit",
        transactionDate: moment().format("MMM Do YYYY"),
        transactionTime: moment().format('LT')
    });

    receiver.transaction.push({
        transactionId: sender.account.accountNumber,
        transactionAmount: amount,
        transactionType: "Credit",
        transactionDate: moment().format("MMM Do YYYY"),
        transactionTime: moment().format('LT')
    });

    await sender.save();
    await receiver.save();

    return {success:true, message: "Money transferred successfully"};
   } catch (error) {
         console.log(error);
         return {error:true, message: "Error while transferring money"};
   }
}

module.exports = transferMonet;