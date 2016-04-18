var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var followSchema = new Schema({
  follower: {type: Schema.ObjectId, ref: 'Users', },
  followee: {type: Schema.ObjectId, ref: 'Users' },
});


module.exports = mongoose.model('Follow', followSchema);