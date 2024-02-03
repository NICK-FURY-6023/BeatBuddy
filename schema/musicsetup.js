const { Schema, model} = require('mongoose');

let msetup = new Schema({
    Guild : String,
    Channel: String,
    Message: String,
})

module.exports = model('msetup', msetup);