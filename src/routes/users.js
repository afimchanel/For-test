const express = require('express');

const router = express.Router({ mergeParams: true });
const usersController = require('../controllers/usersController.js')

router.route('/')
    .get( usersController.getUser)

router.route('/register')
    .post( usersController.registerUser)
router.route('/login')
    .post( usersController.loginUser)

module.exports = router