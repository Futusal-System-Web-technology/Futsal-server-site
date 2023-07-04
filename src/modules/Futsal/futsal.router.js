const express = require('express');
const { postFutsal, getAllFutsal, postBooking } = require('./futsal.controller');
const router = express.Router();

router.route('/').get(getAllFutsal)
router.route('/futsal-booking').post(postBooking)
router.route('/post-futsal').post(postFutsal);

module.exports = router;