var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var communitySchema = new Schema({
  desc: {type: String, required: true },
  name: { type: String, required: true },
  image: String,
  creator: {type: Schema.ObjectId, ref: 'Users'},
  orgs: [{type: Schema.ObjectId, ref: 'Orgs'}]
});


module.exports = mongoose.model('Communities', communitySchema);