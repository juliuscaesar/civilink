var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
  timestamp: Date,
  user: {type: Schema.ObjectId, ref: 'Users', index: { unique: false }},
  desttype: String,
  dest: { type: Schema.ObjectId, refPath: 'desttype' },
  details: String
});


module.exports = mongoose.model('Activity', activitySchema);