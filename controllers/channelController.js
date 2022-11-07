var express = require('express');
var router = express.Router();
const {body, validationResult} = require("express-validator");

const Server = require("../models/server");
const Channel = require("../models/channel");

// console.log("heradsfe")
// exports.get_channel = (req, res) => {
//     console.log("here")
//     res.render("channel-page");
// };
exports.get_channel = (req, res, next) => {
    // if(!res.locals.currentUser)
    //     res.redirect('/sign-up');
    
    // async.parallel({
        //         channel(callback) {
            //             Channel.findById(req.params.channel-id).exec(callback);
    //         },
    //         server(callback) {
        //             Server.findById(req.params.server-id).exec(callback);
        //         }
        //     } 
        // )
    

    Server.findById(req.params.serverId).populate("channels").exec((err, server) => {
        if(err) next(err);

        // find selected channel
        const selectedChannel = server.channels.find((c)=> {
            return c._id.toString() === req.params.channelId;
        });

        res.render("channel-page", {server: server, channel: selectedChannel});
    });
};
        

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