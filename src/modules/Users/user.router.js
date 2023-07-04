const express = require('express');
const { postUser, loginUser, getAllUsers, getMyBooking } = require('./user.controller');
const router = express.Router();

router.route('/').get(getAllUsers)
router.route('/my-booking').post(getMyBooking)
router.route('/register').post(postUser)
router.route('/login').post(loginUser)

module.exports = router;