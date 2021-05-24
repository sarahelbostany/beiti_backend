const userRoutes = require('express').Router()
const userControllers = require('../controllers/userController')


userRoutes.post('/create', userControllers.create)
userRoutes.post('/login', userControllers.login)
userRoutes.get('/verify', userControllers.verify)



module.exports = userRoutes
