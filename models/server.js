var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serverSchema = new Schema({
    admin: {type: Schema.ObjectId, ref: "user"},
    members: [{type: Schema.ObjectId, ref: "user"}],
    channels: [{type: Schema.ObjectId, ref: "channel"}],
    passcode: {type: String},
    privacy: {type: String}, enum:['public', 'private']
});

module.exports = mongoose.model("server", serverSchema);