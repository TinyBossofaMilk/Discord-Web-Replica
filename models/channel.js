const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let channelSchema = new Schema({
    name: {type: String},
    // members: [{type: Schema.ObjectId, ref: "user"}],
    privacy: {type: String}, enum:['public', 'private'],
    messages: [{type: Schema.ObjectId, ref: "message"}],
    
});

// Virtual for this bookinstance object's URL.
channelSchema
.virtual('url')
.get(function () {
  return '/channels/'+this._id;
});

module.exports = mongoose.model("channel", channelSchema);