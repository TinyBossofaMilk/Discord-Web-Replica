var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serverSchema = new Schema({
  name: {type: String},
  admin: {type: Schema.ObjectId, ref: "user"},
  members: [{type: Schema.ObjectId, ref: "user"}],
  channels: [{type: Schema.ObjectId, ref: "channel"}],
  passcode: {type: String},
  privacy: {type: String}, enum:['public', 'private'],
  layout: []
});

// Virtual for this bookinstance object's URL.
serverSchema
.virtual('url')
.get(function () {
  return '/server/'+this._id;
});

module.exports = mongoose.model("server", serverSchema);