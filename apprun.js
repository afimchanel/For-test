const express = require('express');
const app = express();
const passport = require('passport');


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize());
app.use(passport.session());


User = require('./src/models/users')
ExtractJwt = require("passport-jwt").ExtractJwt;
JwtStrategy = require("passport-jwt").Strategy;
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
},async (payload, cb) => {
    u = await User.findById(payload.sub).select('-password')
    cb(null,u)
}));

const usersRoute = require('./src/routes/users')

const authenticate = (req,res,next) => {
    passport.authenticate('jwt', { session: false },function(err, user, info){
        if(err) return next(err)
        req.user = user
        next()
    })(req,res,next)
}

app.use('/api/user',authenticate,usersRoute )


app.all('*', (req, res, next) => {
    return res.status(404).json({'message' :  req.originalUrl + ' not fount thai page'});
});


module.exports = app;
