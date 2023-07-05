const {Schema, model} = require('mongoose')

const Animal = new Schema({
    name: {type: String, required: true},
    species: {type: String, ref: "Species"},
    breed: {type: String, required: true},
    description: {type: String, default: ""},
    location: {
        size: {type: Number, default: null},
        coordinate: [{type: Number, default: null}],
    },
    userID: {type: String, ref: 'User', required: true},
    photo: {type: String, ref: 'Photo', default: ""},
    status: {type: String, required: true},
    dateRegistration: {type: Date},
    message: [{
        description: {type: String, required: true, default: ""},
        userID: {type: String, ref: 'User', required: true, default:""},
        phone:{type: String, default:""},
        photo: {type: String, ref: 'Photo', default: ""},
        date: {type: Date},
        isRead:{type: Boolean,  default: false}
    }]

})

module.exports = model('Animal', Animal)