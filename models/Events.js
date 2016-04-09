var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Posts = require('../models/Posts.js');

var eventSchema = new Schema({
  desc: String,
  title: String,
  when: Date,
  where: String,
  community: {type: Schema.ObjectId, ref: 'Communities'},
  user: {type: Schema.ObjectId, ref: 'Users'},
  going: [{type: Schema.ObjectId, ref: 'Users'}],
  interested: [{type: Schema.ObjectId, ref: 'Users'}],
  invited: [{type: Schema.ObjectId, ref: 'Users'}],
  updates: [String, String],
  comments: [Posts],
  causes: [String],
  goals: [String],
  updates: [String]
});


module.exports = mongoose.model('Events', eventSchema);