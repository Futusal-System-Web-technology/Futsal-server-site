const express = require('express');
const { postUser, loginUser, getAllUsers } = require('./user.controller');
const router = express.Router();

router.route('/').get(getAllUsers)
router.route('/register').post(postUser)
router.route('/login').post(loginUser)

module.exports = router;