var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var membershipsSchema = new Schema({
  user: {type: Schema.ObjectId, ref: 'Users', },
  community: {type: Schema.ObjectId, ref: 'Communities' },
});


module.exports = mongoose.model('Memberships', membershipsSchema);