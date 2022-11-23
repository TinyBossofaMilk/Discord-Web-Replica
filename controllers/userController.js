var express = require('express');
var router = express.Router();
const {body, validationResult} = require("express-validator");
var bcrypt = require("bcryptjs");
const passport = require("passport")
const async = require("async");

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
    successRedirect: "/server/636748fba74abce85b4d6d25/channel/636748fba74abce85b4d6d23",
    failureRedirect: "/log-in"
});

exports.log_out_get = (req, res, next) => {
  req.logout(function (err) {
    if (err) {return next(err);}
    res.redirect("/");
  });
};


/* FRIENDS ********************************************************/

exports.friends_redirect = (req, res) => { res.redirect("/friends/all")};

exports.get_all_friends = (req, res) => {
  User.findById(res.locals.currentUser._id)
    .populate({path: 'friends', model: User})
    .select('friends')
    .exec((err, user) => {
      res.render("friends-page", {friends_list: user.friends, user: res.locals.currentUser});      
    })
};

exports.get_pending_friend_reqs = (req, res) => {
  User.findById(res.locals.currentUser._id)
    .select('friendReqs')
    .populate({path: 'friendReqs', model: User})
    .exec((err, user) => {
      res.render("friend-pending-req", {friends_list: user.friendReqs, user: res.locals.currentUser});      
    });
};

exports.get_blocked_friends = (req, res) => {
  User.findById(res.locals.currentUser._id)
    .select('blockedFriends')
    .populate({path: 'blockedFriends', model: User})
    .exec((err, user) => {
      res.render("friends-page", {friends_list: user.blockedFriends, user: res.locals.currentUser});      
    });
};

exports.get_send_friend_req_form = (req, res) => { res.render("friend-req-form", {user: res.locals.currentUser});};

exports.post_friend_req_form = [
  // body("username").escape(),
  // body("userID").isLength({min:4, max:4}).escape(),
  (req, res, next) => {
    User.findOneAndUpdate({username: req.body.username, userID: req.body.userID},
      {$push: {"friendReqs": res.locals.currentUser._id}}, 
      {safe: true, upsert: true},
      function (err, user) {
          if(err) return next(err);
          res.redirect("/friends");
      }
      )
    }
  ];

exports.post_accept_friend_req = (req, res, next) => {
  async.parallel({
    updateUser: () => {
      User.findByIdAndUpdate(res.locals.currentUser._id, 
        {$push: {"friends": req.body.userID}, $pull: {"friendReqs": req.body.userID}}, 
        {safe: true, upsert: true},
        function (err, user) {
          if(err) return next(err);
        }
      )
    },
    updateSender: () => {
      User.findByIdAndUpdate(req.body.userID, 
        {$push: {"friends": res.locals.currentUser._id}}, 
        {safe: true, upsert: true},
        function (err, user) {
          if(err) return next(err);
        }
      )
    }
  }, function(err, results) {
    if (err) { return next(err); }
    // if (results.bookinstance==null) { // No results.
    //     var err = new Error('Book copy not found');
    //     err.status = 404;
    //     return next(err);
    // }
    // Success.
    res.redirect('/friends/pending');
  })
};


/*  User.updateMany(query.or({_id: res.locals.currentUser._id}, {_id: req.body.userID})
//     [
//       {$push: }
//     ]
//  )
*/
exports.post_reject_friend_req = (req, res, next) => {
  console.log(res.locals.currentUser._id)
  console.log(req.body.userID)
  User.findByIdAndUpdate(res.locals.currentUser._id, 
    {$pull: {"friendReqs": req.body.userID}}, 
    {safe: true, upsert: true},
    function (err, user) {
        if(err) return next(err);
        console.log("Here");
        res.redirect("/friends/pending");
    }
  )
};

exports.getHashedPasswordFor = async password => {
  const result = await bcrypt.hash(password, 10)
    .then(hashedPassword => ({ hashedPassword }))
    .catch(error => ({ error }));
  if (result.error) throw result.error;

  return result.hashedPassword;
};
