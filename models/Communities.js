var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var communitySchema = new Schema({
  desc: String,
  name: String,
  creator: {type: Schema.ObjectId, ref: 'Users'},
  members: [{type: Schema.ObjectId, ref: 'Users'}],
  ideas: [{type: Schema.ObjectId, ref: 'Ideas'}],
  orgs: [{type: Schema.ObjectId, ref: 'Orgs'}]
});


module.exports = mongoose.model('Communities', communitySchema);