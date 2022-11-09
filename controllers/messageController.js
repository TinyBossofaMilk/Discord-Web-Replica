var express = require('express');
var router = express.Router();
const {body, validationResult} = require("express-validator");
const async = require("async");

const Message = require("../models/message");
const User = require("../models/user");
const Server = require("../models/server");
const Channel = require("../models/channel");

exports.post_message = [
    body("msg", "need to enter a message").isLength({min:1}).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log("ERROR posting message")
            res.render("error", {errors: errors.array(),})
            return;
        };

        const newMessage = new Message({
            user: res.locals.currentUser._id,
            text: req.body.msg,
            date: Date.now(),
            // upvote:[],
            // downvote:[]
        }).save((err, newMessage) => {
            Channel.findByIdAndUpdate(req.params.channelId, 
                {$push: {"messages": newMessage}},
                {safe: true, upsert: true},
                function (err, channelInstance){
                    if (err) { return next(err); }
                    res.redirect("/create-server");
                }
            )}
        );
    }
];
/*
    Channel.findById(req.params.channelId).exec((err, channel) => {
        const newMessage = new Message({
            user: res.locals.currentUser._id,
            text: req.body.msg,
            date: Date.now(),
            // upvote:[],
            // downvote:[]
        });

        const updatedChannel = new Channel({
            _id: channel._id,
            name: channel.name,
            privacy: channel.privacy,
            messages: channel.messages.push(newMessage)
        })
        console.log("here");

        newMessage.save((err, newMessage) => {
            Channel.findByIdAndUpdate(req.params.channelId, updatedChannel, {}, function (err, channelInstance){
                if (err) { return next(err); }
                res.redirect("/create-server");
            })
        });
    });
*/

/*
var objFriends = { fname:"fname",lname:"lname",surname:"surname" };
Friend.findOneAndUpdate(
   { _id: req.body.id }, 
   { $push: { friends: objFriends  } },
  function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });
)
*/


/*
async.parallel({
    channel(callback) {
        Channel.findById(req.params.channelId).exec(callback);
    },
    newMessage(callback) {
        newMessage = new Message({
            user: res.locals.currentUser,
            text: req.body.msg,
            date: Date.now()
        }).save(callback)
    }
}), 
(err, results) => {
    console.log("here2")
    if(err) return next(err);
    results.newMessage.save((err, results) => {
        results.channel.messages.push(newMessage)
            .save( (err, res) => {
                res.redirect("/create-server");
            }
        );
    })
}*/



// books.findOne(refid).exec(function(err,book) {
//     book.attachments.push( arr[0] );
//     book.save(function(err){
//       // something here
//     });
//  });

// exports.ability_detail_get = function (req, res, next) {
//     async.parallel(
//         {
//             ability(callback){
//                 Ability.findById(req.params.id)
//                     .exec(callback);
//             },
//             pokemon_list(callback) {
//                 Pokemon.find({ability: req.params.id})
//                     .exec(callback);
//             }
//         },
//         (err, results) => {
//             if(err) return next(err);

//             if(results.ability == null) {
//                 const err = new Error("Ability not found.");
//                 err.status = 404;
//                 return next(err);
//             }
            
//             // Successful, so render.
//             res.render("ability-detail", {
//                 ability: results.ability, 
//                 pokemon_list: results.pokemon_list
//             })
//         }
//     )
// };