var USER = require('../model/user');
var jwt = require('jsonwebtoken');
exports.Sequre = async function (req, res, next) {
    try {
        let token = req.headers.authorization
        if(!token){
            throw new Error("Please Attech Token")
        }
        var decoded = jwt.verify(token, 'Story');
        req.userID = decoded.id
        let UserFind = await USER.findById(decoded.id)
        if(!UserFind){
            throw new Error("User Not Found")
        }
        next()
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.userSignup = async function (req, res, next) {
    try {
        let userCreate = await USER.create(req.body)
        var token = jwt.sign({ id : userCreate._id }, 'STORY');
        res.status(201).json({
            status: "Success",
            message: "User Create Successfull",
            data: userCreate,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.userLogin = async function (req, res, next) {
    try {
      let userFind = await USER.findOne({$or : [{email : req.body.email},{username : req.body.username}] })
      if(!userFind){
        throw new Error("User not Found")
      }
      if(userFind.password !== req.body.password){
        throw new Error("Password Invalid")
      }
      var token = jwt.sign({ id : userFind._id }, 'STORY');
      res.status(200).json({
        status: "Success",
        message: "User Login Successfull",
        data: userFind,
        token
      })
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message
      })
    }
  }

  exports.userAllData = async function (req, res, next) {
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
  }