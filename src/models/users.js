const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const HASHSYNC_NUMBER = 10

const userSchema = new Schema({
  username: { type: String, required: true,unique: true,},
  email: String,
  password: { type: String, required: true },

},{timestamps: true});

userSchema.methods.comparePassword = function(password){
  return  bcrypt.compareSync(password , this.password)
}
userSchema.statics.hashpassword = (password) => {
  const passwordhashing = bcrypt.hashSync(password , HASHSYNC_NUMBER )
  return passwordhashing
}

userSchema.pre('save' , function(next) {
  this.password = bcrypt.hashSync(this.password ,  HASHSYNC_NUMBER )
  next()
})
module.exports = { collectionName : 'Users' , Schema : userSchema };