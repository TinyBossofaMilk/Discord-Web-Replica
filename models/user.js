const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    friends: [{type: Schema.ObjectId, ref:"user"}],
    userID: {type: String},
    friendReqs: [{type: Schema.ObjectId, ref:"user"}]
});

module.exports = mongoose.model("user", userSchema);