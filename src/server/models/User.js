const {Schema, model} = require('mongoose')

const User = new Schema({
    login: {type: String, unique: true, required: true},
    phone: {type: String, required: false, default: "Не указан"},
    password: {type: String, required: false},
    roles: [{type: String, ref: 'Role'}],
    pets: [{type: String, ref: 'Pet'}],
    name: {type: String, default: "Не указано"},
    surname: {type: String, default: "Не указано"},
    patronymic: {type: String, default: "Не указано"},
    isActivated: {type: Boolean, default: false},
    activationLink:{type: String, required:true}
})

module.exports = model('User', User)