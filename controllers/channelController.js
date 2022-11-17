var express = require('express');
var router = express.Router();
const {body, validationResult} = require("express-validator");
var async = require("async");

const User = require("../models/user");
const Server = require("../models/server");
const Channel = require("../models/channel");
const Message = require("../models/message")

exports.get_channel = (req, res, next) => {
    // if(!res.locals.currentUser)
    //     res.redirect('/sign-up');
    
    async.parallel({
        server(callback) {
            Server.findById(req.params.serverId)
                .populate("channels")
                .exec(callback);
        },
        channel(callback) { 
            Channel.findById(req.params.channelId)
            .populate([{
                path: 'messages',
                model: Message,
                populate: {
                    path: "user", 
                    model: User
                }
            },
        ])
            .exec(callback)
        },
    },
        (err, results) => {
            if(err) next(err);

            // find selected channel
            const selectedChannel = results.server.channels.find((c)=> {
                return c._id.toString() === req.params.channelId;
            });
            
            if(selectedChannel === undefined) {results.channel = null;}
            console.log(results.server)
            console.log(res.locals.currentUser)
            res.render("channel-page", {server: results.server, channel: results.channel, user: res.locals.currentUser});
        }
    )
};
        
// https://mongoosejs.com/docs/populate.html
// https://stackoverflow.com/questions/18867628/mongoose-deep-population-populate-a-populated-field