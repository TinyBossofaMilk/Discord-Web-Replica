const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let channelSchema = new Schema({
    name: {type: String},
    messages: [{type: Schema.ObjectId, ref: "message"}],
    privacy: {type: String}, enum:['public', 'private']
});

module.exports = mongoose.model("channel", channelSchema);