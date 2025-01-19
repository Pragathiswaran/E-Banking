const express = require('express');
const router = express.Router();
const {getAccount, transferMoney, getStatement} = require('../controllers/userController');

router.get('/account',getAccount);
router.get('/statement',getStatement);
router.post('/transfer',transferMoney);
module.exports = router;