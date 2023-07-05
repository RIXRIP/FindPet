const User = require("../models/User.js");
const Animal = require("../models/Animal.js");
const Role = require("../models/Role.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret, API_URL, CLIENT_URL} = require("../config")
const Uuid = require("uuid");
const mailService = require("../services/mail-service")
const generateAccessToken = (id, login, roles) => {
    const payload = {
        id,
        login,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(412).json({message: "Ошибка при регистрации", errors})
            }
            const {login, password} = req.body
            const candidate = await User.findOne({login})
            if (candidate) {
                return res.status(400).json({message: "Такой пользователь уже сущестувует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const activationLink = Uuid.v4();
            const userRole = await Role.findOne({value: "user"})
            const user = new User({login, password: hashPassword, activationLink, roles: [userRole.value]})
            await mailService.sendActivationMail(login, `${API_URL}auth/activate/${activationLink}`)
            await user.save()
            return res.json({message: "Пользователь зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }


    async activate(req, res) {
        try {
            const activationLink = req.params.link;
            await mailService.activate(activationLink);
            return res.redirect(CLIENT_URL);
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res) {
        try {
            const {login, password} = req.body
            const user = await User.findOne({login})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${login} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен не верный пароль`})
            }

            const token = generateAccessToken(user._id, user.login, user.roles)
            const userAnimals = await Animal.find({userID: user._id})

            return res.json({
                token, user: {
                    _id: user._id,
                    login: user.login,
                    roles: user.roles,
                    pets: userAnimals,
                    phone: user.phone,
                    name: user.name,
                    surname: user.surname,
                    patronymic: user.patronymic,
                    isActivated: user.isActivated
                }
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async auth(req, res) {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = generateAccessToken(user._id, user.login, user.roles)
            const userAnimals = await Animal.find({userID: user._id})

            return res.json({
                token, user: {
                    _id: user._id,
                    login: user.login,
                    roles: user.roles,
                    pets: userAnimals,
                    phone: user.phone,
                    name: user.name,
                    surname: user.surname,
                    patronymic: user.patronymic,
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    }


    async getUsers(req, res) {
        try {
            const users = await User.find().skip(req.query.skipPages).limit(10)
            let totalUsers = await User.find()
            res.json({
                users,
                totalUsers: totalUsers.length
            })
        } catch (e) {
            console.log(e)
        }
    }

    async showSelectedUser(req, res) {
        try {
            const user = await User.findById(req.query._id)
            const userAnimals = await Animal.find({userID: user._id})
            res.json({
                user: {
                    _id: user._id,
                    login: user.login,
                    roles: user.roles,
                    pets: userAnimals,
                    phone: user.phone,
                    name: user.name,
                    surname: user.surname,
                    patronymic: user.patronymic,
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    async editUserProfile(req, res) {
        try {
            const user = await User.findById(req.body._id)
            const {name, surname, patronymic, phone} = req.body
            user.phone = (phone === "" ? "Не указано" : phone)
            user.name = (name === "" ? "Не указано" : name)
            user.surname = (surname === "" ? "Не указано" : surname)
            user.patronymic = (patronymic === "" ? "Не указано" : patronymic)
            await user.save()
            res.send({message: "Пользователь успешно изменен!"})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()