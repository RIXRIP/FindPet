const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middlewaree/authMiddleware')


//post
router.post('/registration', [
    check('login', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "пароль должен быть больше 4 и меньше 10 символов").isLength({min: 4, max: 10}),
], controller.registration)
router.post('/login', controller.login)
router.post('/editUser',controller.editUserProfile)
//get
router.get('/auth',authMiddleware, controller.auth)
router.get('/users', controller.getUsers)
router.get('/user', controller.showSelectedUser)
router.get('/activate/:link',controller.activate)
module.exports = router