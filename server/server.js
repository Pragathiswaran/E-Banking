const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: require('path').resolve(__dirname, '.env.development') });
const app = express();
// const verifyOtp = require('./utils/otpUtil');
const { authUser, user } = require('./routes/index');
const cookieParser = require('cookie-parser');

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection failed: ' + err));

app.use('/api/auth', authUser);  
app.use('/api/user', user);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));