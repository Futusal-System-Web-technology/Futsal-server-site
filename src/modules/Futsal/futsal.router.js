const express = require('express');
const { postFutsal } = require('./futsal.controller');
const router = express.Router();

router.route('/post-futsal').post(postFutsal);

module.exports = router;