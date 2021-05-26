const imagesRoutes = require('express').Router()
const imagesControllers = require('../controllers/imageControllers')


imagesRoutes.get('/all', imagesControllers.index)
imagesRoutes.post('/save', imagesControllers.save)
// imagesRoutes.get('/save', imagesRoutes.fetchImage )
imagesRoutes.delete('/saved/:id', imagesControllers.destroy)





module.exports = imagesRoutes
