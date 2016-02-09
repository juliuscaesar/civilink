var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Communities = require('../models/Communities.js');

var userSchema = new Schema({
  username:  { type: String, required: true, unique: true },
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  bio:   String,
  location: String,
  occ: String,
  occplace: String,
  points: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  causes: [String],
  communities: [{type: Schema.ObjectId, ref: 'Communities'}],
});


module.exports = mongoose.model('Users', userSchema);