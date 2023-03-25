const express = require('express');

const router = express.Router({ mergeParams: true });
const usersController = require('../controllers/users')

router.route('/')
    .get( usersController.getUser)
    // .patch( usersController.updateUser)

module.exports = router