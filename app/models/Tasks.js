var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  timestamp: Date,
  project: {type: Schema.ObjectId, ref: 'Projects', index: { unique: false }},
  creator: {type: Schema.ObjectId, ref: 'Users', index: { unique: false }},
  title: {type: String, required: true },
  desc: {type: String, required: true },
  points: {type: Number, required: true },
  assigned: [{type: Schema.ObjectId, ref: 'Users' }],
  needed: {type: Number, required: true, default: 1},
  status:  [{type: Schema.ObjectId, ref: 'Users' }]
});


module.exports = mongoose.model('Tasks', taskSchema);