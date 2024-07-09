const mongoose = require('mongoose');

let Schema = mongoose.Schema
let userCreate = new Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})
let USER = mongoose.model("user",userCreate)
module.exports = USER