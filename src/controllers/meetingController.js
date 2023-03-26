
const { Meeting } = require('../config/connectDB')


const catchAsync = require('../middlewares/catchAsync')

const checkDuptime = require('../utils/checkDuptime')

const getAllmeeting = catchAsync(async (req, res, next) => {
    var meetings = await Meeting.find().sort('-createdAt')

    return res.status(200).json({ 'statusCode': 200, 'data': meetings })
})

const getMymeeting = catchAsync(async (req, res, next) => {
    var myMeeting = await Meeting.find({'user_id':req.user._id}).sort('-createdAt')

    return res.status(200).json({ 'statusCode': 200, 'data': myMeeting })
})


const bookingMeeting = catchAsync(async (req, res, next) => {

    if (!req.body.startDate || !req.body.endDate) {
        return res.status(400).json({ 'statusCode': 400, 'message': 'bed required' });
    }
   
    try {
        
        let data = Object.assign({}, req.body,{'user_id':req.user._id})
        var is_dup = await checkDuptime(data,Meeting);
        if (is_dup.length > 0) {
            return res.status(400).json({ 'statusCode': 400, 'message': 'is dup' });
        }
        var result = await Meeting.create(data);
        return res.status(200).json({ 'statusCode': 201, 'message': 'success', 'data': result })
    } catch (error) {
        return res.status(400).json({ 'statusCode': 400, 'message': error });
    }


})




module.exports = { getAllmeeting, bookingMeeting,getMymeeting }