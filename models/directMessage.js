var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var directMessageSchema = new Schema({
    users: [{type: Schema.ObjectId, ref:"User"}],
    messages: [{type: Schema.ObjectId, ref: "Message"}]
});

module.exports = mongoose.model("directMessage", directMessageSchema);