const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    phone:{
        type:String,
        required:true,
    },
    account: {
        accountNumber:{
            type:String,
        },
        accountType:{
            type:String,
        },
        balance:{
            type:Number,
        },
        accountStatus:{
            type:Number,
        }
    },
    crn:{
        type: String,
        required: true,
        max: 10
    },
    ifsc:{
        type: String,
        required: true,
        max: 8
    },
    password: {
        type: String,
        required: true,
        min:8,
        max: 1024
    },
    transaction: {
        type: [{
            transactionId: String,
            transactionAmount: Number,
            transactionDate: String,
        }],
        default: []
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;