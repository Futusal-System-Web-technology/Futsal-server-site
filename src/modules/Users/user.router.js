const express = require('express');
const { postUser } = require('./user.controller');
const router = express.Router();

router.route('/register').post(postUser)

module.exports = router;