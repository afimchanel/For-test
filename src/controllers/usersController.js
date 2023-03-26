
const { Users } = require('../config/connectDB')


const catchAsync = require('../middlewares/catchAsync')



const getUser = catchAsync(async (req, res, next) => {
    var user = await Users.find().sort('-createdAt').select('-password')

    return res.status(200).json({ 'statusCode': 200, 'data': user })
})


const registerUser = catchAsync(async (req, res, next) => {

    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ 'statusCode': 400, 'message': 'bed required' });
    }

    try {
        var result = await Users.create({ username: req.body.username, email: req.body.email, password: req.body.password });
        return res.status(200).json({ 'statusCode': 201, 'message': 'success', 'data': result })
    } catch (error) {
        return res.status(400).json({ 'statusCode': 400, 'message': error });
    }

})

const loginUser = catchAsync(async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ 'statusCode': 400, 'message': 'bed required' });
    }
    var user = await Users.findOne({ username: req.body.username})
    if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    const payload = {
        sub: user._id,
        expire: new Date().getTime() //+ count day
    };
    
    return res.status(200).json({ 'statusCode': 200, 'message': 'success', 'data': {username:user.username},"token":jwt.sign(payload, process.env.JWT_SECRET_KEY), })
});


module.exports = { getUser, registerUser,loginUser }