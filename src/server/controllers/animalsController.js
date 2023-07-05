const Species = require("../models/Species.js");
const Animal = require("../models/Animal")
const {validationResult} = require("express-validator");
const Uuid = require("uuid");
const mailService = require("../services/mail-service")
const User = require("../models/User.js");

class animalsController {
    async registrationAnimals(req, res) {
        try {
            const dateRegistration = new Date();
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации питомца ", errors})
            }
            const {name, species, breed, _location, description, userID, status} = req.body

            let location = JSON.parse(_location)
            const file = req.body.file === "" ? "" : req.files.file
            const photoName = file !== '' ? Uuid.v4() + ".jpg" : ""
            req.body.file !== "" && file.mv('./src/server/static/' + photoName)

            const animal = new Animal({
                name,
                species,
                breed,
                location,
                description,
                userID,
                photo: photoName,
                status,
                dateRegistration
            })
           if(req.body.userID !== undefined){
               await animal.save() ;
               return res.json({message: "Питомец зарегистрирован!"});
           }
           else {
               console.log(e)
               res.status(400).json({message: "При регистрации питомца произошла ошибка"})
           }

        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration animal error"})

        }
    }

    async newSpecies(req, res) {
        try {
            const {name} = req.body
            const candidate = await Species.findOne({name})
            if (candidate) {
                return res.status(400).json({message: "Такой вид уже существует"})
            }
            const species = new Species({name})
            await species.save()
            return res.json({message: "Вид зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "add species error"})
        }
    }


    async getAnimals(req, res) {
        try {
          let status = req.query.status
            const animals = await Animal.find(status === "Все"? {} : {status}).skip(req.query.skipPages).limit(16)
            let totalAnimals = await Animal.find(status === "Все"? {} : {status})
            res.json({
                animals,
                totalAnimals: totalAnimals.length
            })
        } catch (e) {
            console.log(e)
        }
    }

    async showSelectedAnimal(req, res) {
        try {
            const animal = await Animal.findById(req.query._id)
            res.json(animal)
        } catch (e) {
            console.log(e)
        }
    }

    async getAllLocation(req, res) {
        try {
            const animal = await Animal.find({status: "Нашёлся"})
            res.json(animal)
        } catch (e) {
            console.log(e)
        }
    }

    async deleteAnimal(req, res) {
        try {
            const animal = await Animal.deleteOne({_id: req.query._id})
            return res.json({message: "Питомец удален"})
        } catch (e) {
            console.log(e)
        }
    }


    async uploadPhoto(req, res) {
        try {
            const file = req.files.file
            const animal = await Animal.findById(req.body._id)
            const photoName = Uuid.v4() + ".jpg"
            file.mv('./src/server/static/' + photoName)
            animal.photo = photoName
            await animal.save()
            return res.json({message: "Успешно!"})

        } catch (e) {
            console.log(e)
        }
    }

    async editAnimal(req, res) {
        try {
            const animal = await Animal.findById(req.body._id)

            const {name, breed, species, description,status,location} = req.body
            animal.breed = (breed === "" ? "Не указано" : breed)
            animal.name = (name === "" ? "Не указано" : name)
            animal.species = (species === "" ? "Не указано" : species)
            animal.description = (description === "" ? "Не указано" : description)
            animal.status = (status === "" ? "Не указано" : status)
            animal.location = (location === "" ? "Не указано" : location)
            await animal.save()
            res.send({message: "Питомец успешно изменен!"})
        } catch (e) {
            console.log(e)
        }
    }

    async newMessage(req, res) {
        try {
            const {userID, description, phone} = req.body
            const date = new Date();
            const animal = await Animal.findById(req.query._id)
            const userSender = await User.findById({_id: userID})
            const userReceiver = await User.findById({_id: animal.userID})

            const file = req.body.file === "" ? "" : req.files.file
            const photoName = file !== '' ? Uuid.v4() + ".jpg" : ""
            req.body.file !== "" && file.mv('./src/server/static/' + photoName)
            console.log(userSender.login)
            console.log(userReceiver.login)
            console.log(description)
            await mailService.sendMessage(userSender.login, userReceiver.login, description)
            animal.message.push({description, userID, phone, photo: photoName, date})
            await animal.save()
            res.send({message: "Сообщение отправлено!"})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new animalsController()

