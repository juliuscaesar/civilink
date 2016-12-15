var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orgSchema = new Schema({
  desc: String,
  title: String,
  community: {type: Schema.ObjectId, ref: 'Communities', index: { unique: false }},
  members: [{type: Schema.ObjectId, ref: 'Users'}],
  supporters: [{type: Schema.ObjectId, ref: 'Users'}],
  requests: [String],
  causes: [String],
  awards: [String],
  news: [String]
});


module.exports = mongoose.model('Orgs', orgSchema);