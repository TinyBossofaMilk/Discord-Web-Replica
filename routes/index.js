var express = require('express');
var router = express.Router();

//Import Controllers
const userController = require("../controllers/userController");
const serverController = require("../controllers/serverController");
const messageController = require("../controllers/messageController");
const channelController = require("../controllers/channelController");
const dmController = require("../controllers/directMessageController");
const directMessage = require('../models/directMessage');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});


/*USER********************************************************** */

router.get("/sign-up", userController.sign_up_get);

router.post("/sign-up", userController.sign_up_post);

router.get("/log-in", userController.log_in_get);

router.post("/log-in", userController.log_in_post);

router.get("/log-out", userController.log_out_get);


/* FRIENDS ********************************************/

router.get("/friends", userController.friends_redirect);

router.get("/friends/all", userController.get_all_friends);

router.get("/friends/pending", userController.get_pending_friend_reqs);

router.post("/friends/accept-friend-req", userController.post_accept_friend_req);

router.post("/friends/reject-friend-req", userController.post_reject_friend_req);

router.post("/friends/remove-friend", userController.post_remove_friend);

router.get("/friends/blocked", userController.get_blocked_friends);

router.post("/friends/block-friend", userController.post_block_friend);

router.post("/friends/unblock-friend", userController.post_unblock_friend);

router.get("/friends/send-request", userController.get_send_friend_req_form);

router.post("/friends/send-request", userController.post_friend_req_form);


/*DIRECT MESSAGES ********************************************************** */

router.get('/direct-messages/friends', userController.get_all_friends);

router.post('/direct-messages/create-conversation', dmController.post_create_conversation);

router.get('/direct-messages/find-dm', dmController.find_dm);

router.get('/direct-messages/:dmid', dmController.get_dm);


/*SERVER********************************************************** */

router.get("/create-server", serverController.get_create_server);

router.post("/create-server", serverController.post_create_server);

router.get("/server/:id", serverController.get_server);


/*CHANNELS********************************************************** */

router.get('/server/:serverId/channel/:channelId', channelController.get_channel);

router.post('/server/:serverId/create-channel', channelController.post_create_channel);







/*MESSAGES********************************************************** */

router.post('/server/:serverId/channel/:channelId', messageController.post_message);







module.exports = router;
