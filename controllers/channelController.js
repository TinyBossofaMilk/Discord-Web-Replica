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
            }])
            .exec(callback)
        },
    },
        (err, results) => {
            if(err) next(err);

            // find selected channel
            const selectedChannel = results.server.channels.find((c)=> {
                return c._id.toString() === req.params.channelId;
            });
            
            //if the server doesn't have the channel, null it.
            if(selectedChannel === undefined) {results.channel = null;}

            const showPopup = (e) => {
                let c = document.querySelector("form.container-popup#add-channel")
                c.hidden = false;

                // addEventListener()
                console.log(c)
            }
            // console.log(showPopup())
            let createChannelURL = `/server/${req.params.serverId}/create-channel`;
            
            res.render("channel-page", {server: results.server, 
                channel: results.channel,
                createChannelURL: createChannelURL, 
                showPopup: this.showPopup,
                user: res.locals.currentUser});
        }
    )
};
        
// https://mongoosejs.com/docs/populate.html
// https://stackoverflow.com/questions/18867628/mongoose-deep-population-populate-a-populated-field

exports.post_create_channel = [
    body("name").trim().isLength({min:1}).withMessage("Name must not be empty").escape(),
    body("genre").escape(),
    (req, res, next) => {
        // console.log("checkbox here")
        // console.log(req.body.private)
        // console.log(req.body.private.value)
        console.log(req.body.private.value)
        //TODO: FIX PRIVATE BODY FUNCTION, IT'S NOT BEING PROCESSED CORRECTLY
        const newChannel = new Channel ({
            name: req.body.name,
            private: req.body.private,
        }).save((err, newChannel)=> {
            Server.findByIdAndUpdate(req.params.serverId, 
                {$push: {"channels": newChannel}},
                {safe: true, upsert: true},
                function (err, serverInstance) {
                    console.log(newChannel)
                    if (err) { return next(err); }
                    res.redirect(`/server/${req.params.serverId}/channel/${newChannel._id}`);
                }
            )
        })
    }
];