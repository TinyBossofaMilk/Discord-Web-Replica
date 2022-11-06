var express = require('express');
var router = express.Router();
const {body, validationResult} = require("express-validator");

exports.get_channels = (req, res, next) => {
    if(!res.locals.currentUser)
        res.redirect('/sign-up');

    res.render
};