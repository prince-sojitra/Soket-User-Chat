  var express = require('express');
  var MESSAGE = require('../model/message');
  var router = express.Router();


  router.post('/create', async function (req, res, next) {
    try {
      let messageCreate = await USER.MESSAGE(req.body)
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

  router.get('/', async function (req, res, next) {
    try {
      let MessageFind = await USER.find().populate('User');
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
