var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ideaSchema = new Schema({
  desc: String,
  title: String,
  community: {type: Schema.ObjectId, ref: 'Communities'},
  user: {type: Schema.ObjectId, ref: 'Users'},
  points: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  volunteers: [{type: Schema.ObjectId, ref: 'Users'}],
  goals: [String],
  updates: [String]
});


module.exports = mongoose.model('Ideas', ideaSchema);