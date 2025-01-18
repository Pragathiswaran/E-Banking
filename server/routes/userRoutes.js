const express = require('express');
const router = express.Router();
const {getAccount} = require('../controllers/userController');

router.get('/account',getAccount);

module.exports = router;