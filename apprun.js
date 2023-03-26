const express = require('express');
var session = require('express-session');
const app = express();
const passport = require('passport');
jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(session({ secret: 'keyboard cat' })); 
app.use(passport.initialize());
app.use(passport.session());


const { Users } = require('./src/config/connectDB')
requireJWTAuth = passport.authenticate("jwt",{session:false});
ExtractJwt = require("passport-jwt").ExtractJwt;
JwtStrategy = require("passport-jwt").Strategy;
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
},async (payload, cb) => {
    u = await Users.findById(payload.sub).select('-password')
    cb(null,u)
}));

const usersRoute = require('./src/routes/users')


app.use('/api/user',requireJWTAuth,usersRoute )


app.all('*', (req, res, next) => {
    return res.status(404).json({'message' :  req.originalUrl + ' not fount page'});
});


module.exports = app;
