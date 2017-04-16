var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pendPointsSchema = new Schema({
  timestamp: Date,
  task: {type: Schema.ObjectId, ref: 'Tasks', index: { unique: false }},
  user: {type: Schema.ObjectId, ref: 'Users', index: { unique: false }},
  admin: {type: Schema.ObjectId, ref: 'Users', index: { unique: false }},
  awarded: { type: Boolean, default: false }
});


module.exports = mongoose.model('PendPoints', pendPointsSchema);