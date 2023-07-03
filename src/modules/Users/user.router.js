const express = require('express');
const { postUser, loginUser } = require('./user.controller');
const router = express.Router();

router.route('/register').post(postUser)
router.route('/login').post(loginUser)

module.exports = router;