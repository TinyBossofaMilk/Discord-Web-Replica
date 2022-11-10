var express = require('express');
var router = express.Router();
const {body, validationResult} = require("express-validator");
var async = require("async");

const User = require("../models/user");
const Server = require("../models/server");
const Channel = require("../models/channel");

exports.get_channel = (req, res, next) => {
    // if(!res.locals.currentUser)
    //     res.redirect('/sign-up');
    
    async.parallel({
        server(callback) {
            Server.findById(req.params.serverId).exec(callback);
            // .populate("channels")
        },
        channel(callback) {
            Channel.findById(req.params.channelId).populate("messages").exec(callback);
        }},
        (err, results) => {
            if(err) next(err);

            // find selected channel
            const selectedChannel = results.server.channels.find((c)=> {
                return c._id.toString() === req.params.channelId;
            });

            if(selectedChannel === undefined) {
                results.channel = null;
            }
            else{
                // results.channel.messages.forEach(msg => {
                //     console.log(msg)
                //     msg.populate("user");
                // });

                results.channel.messages.forEach(async msg => {
                    msg.user = await User.findById(msg.user);
                    console.log(msg.user);
                });
                    
                // let author = await User.findById(results.channel.messages[0].user);
                // console.log(author);
                console.log(results.channel.messages[0]);
                console.log(results.channel.messages[0].user);
            }
            
            res.render("channel-page", {server: results.server, channel: results.channel});
        }
    )
};
        
// https://mongoosejs.com/docs/populate.html
/*
exports.ability_detail_get = function (req, res, next) {
    async.parallel(
        {
            ability(callback){
                Ability.findById(req.params.id)
                    .exec(callback);
            },
            pokemon_list(callback) {
                Pokemon.find({ability: req.params.id})
                    .exec(callback);
            }
        },
        (err, results) => {
            if(err) return next(err);

            if(results.ability == null) {
                const err = new Error("Ability not found.");
                err.status = 404;
                return next(err);
            }
            
            // Successful, so render.
            res.render("ability-detail", {
                ability: results.ability, 
                pokemon_list: results.pokemon_list
            })
        }
    )
};
*/

/*    Server.findById(req.params.serverId).populate("channels").exec((err, server) => {
        if(err) next(err);

        // find selected channel
        const selectedChannel = server.channels.find((c)=> {
            return c._id.toString() === req.params.channelId;
        });

        // selectedChannel.populate("messages");
        // console.log(selectedChannel);

        res.render("channel-page", {server: server, channel: selectedChannel});
    });
    */