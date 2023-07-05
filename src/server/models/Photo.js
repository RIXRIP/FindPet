const {Schema, model, ObjectId} = require('mongoose')

const File = new Schema({
    name: {type: String, required: false},
    type: {type: String, required: false},
    accessLink: {type: String},
    size: {type: Number, default: 0},
  
})

module.exports = model('File', File)