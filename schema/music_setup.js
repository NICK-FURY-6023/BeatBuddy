const { Schema, model} = require('mongoose');

let setup = new Schema({
    Guild : String,
    Channel: String,
    Message: String,
})

module.exports = model('music_setup', setup);