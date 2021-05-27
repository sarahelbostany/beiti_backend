const { request } = require('express')
const models = require('../models')
const user = require('../models/user')


const imageControllers = {}

//get all images
imageControllers.index = async (req, res) => {
    console.log('get all images')
    try {
        const images = await models.image.findAll()


        res.json((images))
        console.log(images)
    }catch (error) {
        console.log(error);
        res.status(400).json({ error: error.mesaage })
    }
}


//add image to user profile
imageControllers.save = async (req, res) => {
    try {
        // const user = await models.user.findOne({
        //     where: {
        //         id: req.headers.authorization
        //     }
        // })
        // console.log('add imagae to user', user)
        const favImage = await models.image.findOne({
            where: {
                id: req.body.imageId
            }
        })
        console.log('fav image req', favImage);
        // console.log(user);
        await models.individual_image.findOrCreate(
            {
                where: {
                    userId: req.headers.authorization,
                    imageId: req.body.imageId
                }
            }

        )
        res.json({favImage})
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}


//get saved images and post to dahsboard --> similar to index
imageControllers.dashboardImage = async (req, res) => {
    console.log('SHOW ROUTE')
    try {
        console.log(req.headers.authorization)
        const user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })



        const savedImage = await user.getImages()
        console.log(savedImage)
        res.json({savedImage})


    }catch (error) {
        console.log(error);
        res.status(400).json({ error: error.mesaage })
    }
}



//delete image
imageControllers.destroy = async (req, res) => {
    console.log(req.params);
    try {
        const image = models.image.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json({image, message: 'deleted successfully'})
        await image.reload()

    }catch (error) {
        console.log(error);
        res.status(400).json({ error: error.mesaage })
    }
}



module.exports = imageControllers
