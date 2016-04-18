var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
  timestamp: Date,
  user: {type: Schema.ObjectId, ref: 'Users', index: { unique: true }},
  desttype: String,
  dest: Schema.ObjectId,
  details: String
});


module.exports = mongoose.model('Activity', activitySchema);