const mongoose = require('mongoose');

let Schema = mongoose.Schema
let MessageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    TimeStamp: {
        type: Date,
        default: Date.now
    },
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
})
let MESSAGE = mongoose.model("Message", MessageSchema)
module.exports = MESSAGE