var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var postSchema = new Schema({
  person: {type: Schema.ObjectId, ref: 'Users'},
  comment: String
});

module.exports = mongoose.model('Posts', postSchema);