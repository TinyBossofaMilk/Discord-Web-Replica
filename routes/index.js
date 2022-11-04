var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Import Controllers
const userController = require("../controllers/userController");
const serverController = require("../controllers/serverController");
const messageController = require("../controllers/messageController");
// const channelController = require("../controllers/channel");


router.get("/sign-up", userController.sign_up_get);

router.post("/sign-up", userController.sign_up_post);

router.get("/log-in", userController.log_in_get);

router.post("/log-in", userController.log_in_post);

// router.get("/log-out", userController.log_out_get);

// router.get("/membership-form", userController.membership_get);

// router.post("/membership-form", userController.membership_post);

// router.get("/messages", messageController.messages_get)

// router.get("/message-form", messageController.message_form_get)

// router.post("/message-form", messageController.message_form_post)

// router.post("/messages", messageController.message_delete_post);


module.exports = router;
