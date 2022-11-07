const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let channelSchema = new Schema({
    name: {type: String},
    // members: [{type: Schema.ObjectId, ref: "user"}],
    privacy: {type: String}, enum:['public', 'private'],
    messages: [{type: Schema.ObjectId, ref: "message"}]
});

module.exports = mongoose.model("channel", channelSchema);