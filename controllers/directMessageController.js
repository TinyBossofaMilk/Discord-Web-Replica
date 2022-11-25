var express = require('express');
var router = express.Router();
const {body, validationResult} = require("express-validator")

const DirectMessage = require("../models/directMessage");
const Message = require("../models/message");
const User = require("../models/user");


exports.find_dm = (req, res, next) => {
    console.log(res.locals.currentUser )
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

exports.get_dm = (req, res, next) => {
    DirectMessage.findById(req.params.dmid)
    .exec((err, dm) => {        
        res.render(`/direct-messages/${dm._id}`);
    });
}

exports.post_create_conversation = (req, res, next) => {
    const dm = new DirectMessage({
        users:[res.locals.currentUser._id, req.body.userID],
        messages:[]
    });

    dm.save((err => err ? next(err) : res.redirect(dm.url)))
};

exports.post_add_message = (req, res, next) => {
    const message = new Message({

    })
};