var express = require('express');
var USER = require('../model/user');
var router = express.Router();


router.post('/signup', async function (req, res, next) {
  try {
    let userCreate = await USER.create(req.body)
    res.status(201).json({
      status: "Success",
      message: "User Create Successfull",
      data: userCreate
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
});

router.post('/login', async function (req, res, next) {
  try {
    let userFind = await USER.findOne({$or : [{email : req.body.email},{username : req.body.username}] })
    if(!userFind){
      throw new Error("User not Found")
    }
    if(userFind.password !== req.body.password){
      throw new Error("Password Invalid")
    }
    res.status(200).json({
      status: "Success",
      message: "User Login Successfull",
      data: userFind
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
    let userFind = await USER.find()
    res.status(200).json({
      status: "Success",
      message: "User Found Successfull",
      data: userFind
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
});





module.exports = router;
