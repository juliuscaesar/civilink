var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Communities = require('../models/Communities.js');

var userSchema = new Schema({
  username:  { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  bio:   { type: String, default: ''},
  zip: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  occ: { type: String, default: ''} ,
  occplace: { type: String, default: ''},
  points: { type: Number, default: 0 },
  causes: [String],
  communities: [{type: Schema.ObjectId, ref: 'Communities'}],
});


module.exports = mongoose.model('Users', userSchema);