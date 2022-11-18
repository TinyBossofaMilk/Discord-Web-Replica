var express = require('express');
var router = express.Router();

//Import Controllers
const userController = require("../controllers/userController");
const serverController = require("../controllers/serverController");
const messageController = require("../controllers/messageController");
const channelController = require("../controllers/channelController");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get("/sign-up", userController.sign_up_get);

router.post("/sign-up", userController.sign_up_post);

router.get("/log-in", userController.log_in_get);

router.post("/log-in", userController.log_in_post);

router.get("/log-out", userController.log_out_get);

// router.get("/membership-form", userController.membership_get);

// router.post("/membership-form", userController.membership_post);

// router.get("/messages", messageController.messages_get)

// router.get("/message-form", messageController.message_form_get)

// router.post("/message-form", messageController.message_form_post)

// router.post("/messages", messageController.message_delete_post);


/*SERVER********************************************************** */

router.get("/create-server", serverController.get_create_server);

router.post("/create-server", serverController.post_create_server);

router.get("/server/:id", serverController.get_server);


/*CHANNELS********************************************************** */

router.get('/server/:serverId/channel/:channelId', channelController.get_channel);

router.get('/server/:serverId/create-channel', channelController.get_channel);







/*MESSAGES********************************************************** */

router.post('/server/:serverId/channel/:channelId', messageController.post_message);







module.exports = router;
