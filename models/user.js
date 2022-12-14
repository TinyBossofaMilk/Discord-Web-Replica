const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    userID: {type: String},
    // birthday: {type: Date},
    friends: [{type: Schema.ObjectId, ref:"user"}],
    friendReqs: [{type: Schema.ObjectId, ref:"user"}],
    blockedFriends: [{type: Schema.ObjectId, ref:"user"}],
    serverLayout: [{type: Schema.Types.Mixed}]
});

module.exports = mongoose.model("user", userSchema);