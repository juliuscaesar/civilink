var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  desc: String,
  title: String,
  community: {type: Schema.ObjectId, ref: 'Communities', index: { unique: false }},
  user: {type: Schema.ObjectId, ref: 'Users'},
  points: { type: Number, default: 0 },
  url: String,
  supporters: [{type: Schema.ObjectId, ref: 'Users'}],
  volunteers: [{type: Schema.ObjectId, ref: 'Users'}],
  causes: [String],
  updates: [String]
});


module.exports = mongoose.model('Projects', projectSchema);
