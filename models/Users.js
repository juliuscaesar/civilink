var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Communities = require('../models/Communities.js');

var userSchema = new Schema({
  username:  { type: String, required: true, unique: true, minlength: 4, maxlength: 24 },
  avatar: String,
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  firstName: { type: String, required: true, maxlength: 35 },
  lastName: { type: String, required: true, maxlength: 35 },
  password: { type: String, required: true, minlength: 8 },
  bio:   { type: String, default: '', maxlength: 240 },
  zip: { type: Number, required: true, max: 99999 },
  city: { type: String, required: true },
  state: { type: String, required: true },
  occ: { type: String, default: ''} ,
  occplace: { type: String, default: ''},
  points: { type: Number, default: 0 },
  causes: [String],
  communities: [{type: Schema.ObjectId, ref: 'Communities'}],
});


module.exports = mongoose.model('Users', userSchema);