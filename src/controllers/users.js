const _ = require('lodash');
const { ObjectId } = require('mongoose').Types

const { Users  } = require('../config/connectDB')


const catchAsync = require('../middlewares/catchAsync')



const getUser = catchAsync(async(req,res,next) => {

   
    return res.status(200).json({ 'statusCode' : 200 , 'data' : 'result' })
})

const updateProject = catchAsync(async(req,res,next) => {

    
    return res.status(200).json({'statusCode' : 201 , 'data' : 'result' })
})


module.exports = { getUser ,updateProject }