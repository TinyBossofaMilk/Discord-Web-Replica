var express = require('express');
var router = express.Router();
const {body, validationResult} = require("express-validator")

const DM = require("../models/directMessage");
const Message = require("../models/message");
const User = require("../models/user");


exports.get_dm = (req, res, next) => {
    console.log(req.params.id)
    DM.findById(req.params.id)
    .populate([{
        path:'users',
        model: User,
        // populate: {
        //     path: "messages",
        //     model: Message,
        //     populate: {
        //         path: "user",
        //         model: User
        //     }
        // }
    },
    {
        path: "messages",
        model: Message,
        populate: {
            path: "user",
            model: User
        }
    }])
    .exec((err, dm) => {
        console.log(dm)
        res.render(`dm-page`, {dm: dm, user: res.locals.currentUser});
    });
}

exports.post_create_conversation = (req, res, next) => {
    const dm = new DM({
        users:[res.locals.currentUser._id, req.body.userID],
        messages:[]
    });

    dm.save((err => err ? next(err) : res.redirect(dm.url)))
};

exports.post_add_message = [
    body("msg").isLength({min:1}),
    (req, res, next) => {
        const message = new Message({
            user: res.locals.currentUser,
            text: req.body.msg,
            date: Date.now()
        }).save((err, message) => {
            DM.findByIdAndUpdate(req.params.id,
                {$push: {"messages": message}},
                {safe: true, upsert: true},
                function (err, dmInstance){
                    if (err) { return next(err); }
                    res.redirect(dmInstance.url);
                }
        )})
    }
];


/* Prob won't be used
exports.find_dm = (req, res, next) => {
    console.log(res.locals.currentUser)
    console.log(req.body.userID)

    DirectMessage.find({users:{$all: [res.locals.currentUser, req.body.userID]}})
    .exec((err, dm) => {
        console.log("DM " + dm)
        //if the convo doesn't exist, make a new one.
        if(!dm) return this.post_create_conversation;
        
        console.log("made it here")
        res.redirect(`/direct-messages/${dm._id}`);
    });
};
*/