const express = require('express');

const router = express.Router({ mergeParams: true });
const meetingController = require('../controllers/meetingController')

router.route('/')
    .get( meetingController.getAllmeeting)
router.route('/mymeeting')
    .get( meetingController.getMymeeting)
router.route('/booking')
    .post( meetingController.bookingMeeting)

module.exports = router