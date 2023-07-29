const express = require('express')
const {
  postUser,
  loginUser,
  getAllUsers,
  getMyBooking,
  updateBooking,
  getAllBooking,
  deleteBooking
} = require('./user.controller')
const router = express.Router()

router.route('/').get(getAllUsers)
router.route('/all-bookings').get(getAllBooking)
router.route('/delete-booking').delete(deleteBooking)
router.route('/my-booking').post(getMyBooking)
router.route('/register').post(postUser)
router.route('/login').post(loginUser)
router.route('/update-booking').put(updateBooking)

module.exports = router
