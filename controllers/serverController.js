var express = require('express');
var router = express.Router();
const {body, validationResult} = require("express-validator");

const Server = require("../models/server");
const Channel = require("../models/channel");
const User = require("../models/user");

exports.get_create_server = (req, res) => {res.render("server-form", {user: res.locals.currentUser});};

exports.post_create_server = [
    body("name").trim().isLength({min:1}).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log("ERROR MAKING ACCOUNT")
            res.render("error", {errors: errors.array(),})
            return;
        };


        const generalChannel = new Channel({
            name: "General",
            privacy: "public"
        }).save((err, generalChannel) => {
            const newServer = new Server({
                name: req.body.name,
                admin: res.locals.currentUser,
                members: [res.locals.currentUser],
                channels: [generalChannel],
                passcode: null,
                privacy: "public",
                layout: []
            });
            newServer.save((err) => {
                if(err) return next(err);
                
                User.findByIdAndUpdate(res.locals.currentUser._id, 
                    {$push: {"serverLayout":newServer._id}}, 
                    {safe: true, upsert: true},
                    function (err, user) {
                        if(err) return next(err);
                        res.redirect(newServer.url)
                })
            });
        }) 
    }
];

exports.get_delete_server = (req, res, next) => {

};

exports.post_add_member = (req, res, next) => {

};

exports.delete_member = (req, res, next) => {};

exports.add_banned_member =  (req, res, next) => {};

exports.delete_banned_member =  (req, res, next) => {};

exports.add_channel = (req, res, next) => {};

exports.get_server = (req, res, next) => {
    Server.findById(req.params.id).populate("channels").exec((err, server) => {
        if(err) next(err);

        res.render("server-page", {server: server, user: res.locals.currentUser})
    })
};