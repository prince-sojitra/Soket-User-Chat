  var express = require('express');
  var MESSAGE = require('../model/message');
  var USERC = require('../controller/user');
  var router = express.Router();


  router.post('/create',USERC.Sequre, async function (req, res, next) {
    try {
      console.log(req.userID);
      req.body.User = req.userID
      let messageCreate = await MESSAGE.create(req.body)
      res.status(201).json({
        status: "Success",
        message: "Message Send Successfull",
        data: messageCreate
      })
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message
      })
    }
  });

  router.get('/',USERC.Sequre, async function (req, res, next) {
    try {
      let MessageFind = await MESSAGE.find().populate('User');
      res.status(200).json({
        status: "Success",
        message: "Message Found Successfull",
        data: MessageFind
      })
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message
      })
    }
  });



  module.exports = router;
