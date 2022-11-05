var express = require('express');
var router = express.Router();
const {body, validationResult} = require("express-validator");

const Server = require("../models/server");

exports.get_create_server = (req, res, next) => {
    res.render("server-form");
};

exports.get_delete_server = (req, res, next) => {

};

exports.post_add_member = (req, res, next) => {

};

exports.delete_member = (req, res, next) => {};

exports.add_banned_member =  (req, res, next) => {};

exports.add_channel = (req, res, next) => {};