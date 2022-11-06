var express = require('express');
var router = express.Router();
const {body, validationResult} = require("express-validator");
var bcrypt = require("bcryptjs");
const passport = require("passport")

const User = require("../models/user");

exports.sign_up_get = (req, res) => {
  //if already logged in, redirects you to the home.
  if(res.locals.currentUser) {
    return res.redirect("/");
  };

  res.render("sign-up");
};

exports.sign_up_post = [
  //validate fields
  body("username").trim().isLength({min:1}).withMessage("Username must not be empty"),
  body("email").trim().isLength({min:1}).withMessage("Email must not be empty"),
  body("password").trim().isLength({min:1}).withMessage("Email must not be empty"),
  body("confirmPassword").custom((value, {req}) => {
    if(value !== req.body.password) throw new Error('passwords need to match');
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      console.log("ERROR MAKING ACCOUNT")
      res.render("sign-up", {
        username: req.body.username,
        // password: req.body.password,
        email: req.body.email,
        errors: errors.array(),
      })
      return;
    }
    
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if(err) throw new Error("password hashing error");
      
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        userID: "3853",
        friends:[],
        friendReqs: []
      });
      
      user.save(err => err ? next(err) : res.redirect("/"));
    })
  }
];

exports.log_in_get = (req, res) => {
    //if already logged in, redirects you to the home.
    if(res.locals.currentUser) { 
      return res.redirect("/");
    };

    res.render("log-in");
}

exports.log_in_post = passport.authenticate("local", {
    successRedirect: "/create-server",
    failureRedirect: "/log-in"
});

exports.send_friend_req = (req, res) => {

};

exports.accept_friend_req = (req, res) => {

};

exports.getHashedPasswordFor = async password => {
  const result = await bcrypt.hash(password, 10)
    .then(hashedPassword => ({ hashedPassword }))
    .catch(error => ({ error }));
  if (result.error) throw result.error;

  return result.hashedPassword;
};
