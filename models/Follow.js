var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var followSchema = new Schema({
  follower: {type: Schema.ObjectId, ref: 'Users', index: { unique: true }},
  followee: {type: Schema.ObjectId, ref: 'Users', index: { unique: true }},
});


module.exports = mongoose.model('Follow', followSchema);