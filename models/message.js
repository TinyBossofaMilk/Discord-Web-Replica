var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    user: {type: Schema.ObjectId, ref:"User"},
    text: {type: String},
    date: {type: Date},
    upvote: [{type: Schema.ObjectId, ref:"User"}],
    downvote: [{type: Schema.ObjectId, ref:"User"}],
});

module.exports = mongoose.model("message", messageSchema);