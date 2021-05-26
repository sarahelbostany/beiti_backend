const userRoutes = require('express').Router()
const userControllers = require('../controllers/userControllers')


userRoutes.post('/create', userControllers.create)
userRoutes.post('/login', userControllers.login)
userRoutes.get('/verify', userControllers.verify)
userRoutes.post('/logout',userControllers.logout)




module.exports = userRoutes
