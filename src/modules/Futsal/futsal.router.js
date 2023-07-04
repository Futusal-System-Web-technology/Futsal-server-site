const express = require('express');
const { postFutsal, getAllFutsal } = require('./futsal.controller');
const router = express.Router();

router.route('/').get(getAllFutsal)
router.route('/post-futsal').post(postFutsal);

module.exports = router;