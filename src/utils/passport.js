const { Strategy, ExtractJwt } = require('passport-jwt');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const AppError = require('./appError');
const { User, UserType, Device, DeviceConfig, Zone } = require('./../models');

module.exports = (passport) => {
  const popOption = {
    attributes : {
      exclude:['token','password','passwordResetToken','passwordResetExpires','createdAt', 'updatedAt', 'deletedAt']
    },
    include: [
      {
        model: UserType,
        attributes: ['name']
      },
    ],   
  };

  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
  };
  passport.use(
    new Strategy(options, async (payload, done) => {
      const user = await User.findByPk(payload.username);
      if(user) return done(null, user);
      return done(null, false);
    })
  );
  passport.use(
    new BearerStrategy((token, done) => {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) return done(new AppError('not Authorized', 403));
        if(decoded.client == 'device') {
          const deviceconfig = await DeviceConfig.findOne({where:{username:decoded.username, token: token}})
          if(!deviceconfig) return done(null, false);
          const device = await Device.findOne({
            raw:true,
            nest: true,
            where:{deviceconfig_id: deviceconfig.id},
            include:[
                {
                    model: Zone
                }
            ]
          })
          if(device) {
            device.UserType = {name: 'tablet'}
            return done(null, device);
          }
          return done(null, false);
        }else{
          const user = await User.findOne(Object.assign({where:{ username: decoded.username, token: token }},popOption))
          if(user) return done(null, user);
          return done(null, false);
        }
      });
    })
  );
};