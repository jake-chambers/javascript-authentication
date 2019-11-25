
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

//simple schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});


//custom method to generate authToken 
UserSchema.methods.generateAuthToken = function() { 
  let payload = {
    _id: this._id, 
    username: this.username 
  }

  let options = {
    expiresIn: "120000" //ms
  }
  
  //get the private key from the config file -> environment variable
  const token = jwt.sign(payload, config.get('myprivatekey'), options); 
  return token;
}

const User = mongoose.model('User', UserSchema);

//function to validate user 
function validateUser(user) {
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;