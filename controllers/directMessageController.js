var express = require('express');
var router = express.Router();
const {body, validationResult} = require("express-validator")

const DirectMessage = require("../models/directMessage");
const Message = require("../models/message");
const User = require("../models/user");

exports.get_dm = (req, res, next) => {

};

exports.post_create_conversation = (req, res, next) => {

};

exports.post_add_message = (req, res, next) => {
    const message = new Message({

    })
};