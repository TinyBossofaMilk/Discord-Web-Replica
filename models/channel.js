const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let channelSchema = new Schema({
    name: {type: String},
    private: {type: Boolean},
    messages: [{type: Schema.ObjectId, ref: "message"}]
});

// Virtual for this server's object's URL.
// serverSchema
// .virtual('url')
// .get(function () {
//   return '/server/' + '/channel/' + this._id;
// });

module.exports = mongoose.model("channel", channelSchema);