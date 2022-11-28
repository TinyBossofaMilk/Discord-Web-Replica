const { dir } = require('async');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var directMessageSchema = new Schema({
    users: [{type: Schema.ObjectId, ref:"User"}],
    messages: [{type: Schema.ObjectId, ref: "Message"}],
    lastUpdated: {type: Date}
});

// Virtual for this direct messsage's object's URL.
directMessageSchema
.virtual('url')
.get(function () {
  return '/direct-messages/'+this._id;
});

module.exports = mongoose.model("directMessage", directMessageSchema);