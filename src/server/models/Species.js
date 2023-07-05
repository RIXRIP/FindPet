const {Schema, model} = require("mongoose");
const Species = new Schema({
    name: {type: String, unique: true, required: true},

})

module.exports = model('Species', Species)