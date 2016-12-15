var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
  timestamp: Date,
  user: {type: Schema.ObjectId, ref: 'Users', index: { unique: false }},
  desttype: String,
  community: { type: Schema.ObjectId, ref: 'Communities' },
  project: { type: Schema.ObjectId, ref: 'Projects' },
  task: { type: Schema.ObjectId, ref: 'Tasks' },
  org: { type: Schema.ObjectId, ref: 'Orgs' },
  details: String
});


module.exports = mongoose.model('Activities', activitySchema);