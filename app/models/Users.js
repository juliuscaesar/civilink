var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var Communities = require('../models/Communities.js');

var userSchema = new Schema({
  username:  { type: String, required: true, unique: true, minlength: 4, maxlength: 24 },
  avatar: String,
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  firstName: { type: String, required: true, maxlength: 35 },
  lastName: { type: String, required: true, maxlength: 35 },
  gender: { type: String, default: ''} ,
  password: { type: String, required: true, minlength: 8 },
  bio:   { type: String, default: '', maxlength: 240 },
  zip: { type: Number, max: 99999 },
  city: { type: String, required: true },
  state: { type: String, required: true },
  occ: { type: String, default: ''} ,
  occplace: { type: String, default: ''},
  points: { type: Number, default: 0 },
  homepage: { type: String, default: ''} ,
  facebook: { type: String, default: ''} ,
  linkedin: { type: String, default: ''} ,
  twitter: { type: String, default: ''} ,
  instagram: { type: String, default: ''} ,
  causes: [String],
  communities: [{type: Schema.ObjectId, ref: 'Communities'}],
});

// Method to compare password for login
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Users', userSchema);
