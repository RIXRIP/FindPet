const Router = require('express')
const router = new Router()
const controller = require('../controllers/animalsController')
const {check} = require('express-validator')

//post
router.post("/species",[
    check('name', "Имя питомца не может быть пустым").notEmpty(),
    check('species', "Вид питомца не может быть менее 4 символов").isLength({min: 4, max: 20}),
    check('breed', "Порода питомца не может быть менее 4 символов").isLength({min: 4, max: 20}),
    check('description', "Описание питомца не может быть менее 15 символов и более 400").isLength({min: 15, max: 400})
], controller.newSpecies)
router.post("/", controller.registrationAnimals)
router.post("/photo" , controller.uploadPhoto)
router.post("/edit" , controller.editAnimal)
router.post("/message" , controller.newMessage)

//get
router.get("/", controller.getAnimals)
router.get('/animal', controller.showSelectedAnimal)
router.get('/location', controller.getAllLocation)
module.exports = router

//delete
router.delete('/animal', controller.deleteAnimal)
