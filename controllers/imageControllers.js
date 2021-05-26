const { request } = require('express')
const models = require('../models')
const user = require('../models/user')


const imageControllers = {}

//get all images
imageControllers.index = async (req, res) => {
    console.log('backend', req.params)
    try {
        const images = await models.image.findAll()


        res.json((images))
    }catch (error) {
        console.log(error);
        res.status(400).json({ error: error.mesaage })
    }
}


//add image to user profile
imageControllers.save = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        console.log(user)
        const favImage = await models.image.findOne({
            where: {
                id: req.body.id
            }
        })
        console.log('fav image req', favImage);
        // console.log('favIdea', favIdea);
        // console.log(user);
        await user.addImage(favImage)
        res.json({favImage})
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}


// //get saved images and post to dahsboard
// imageControllers.fetchImage = async (req, res) => {
//     try {
//         const images = await models.user.findOne({
//             where: {
//                 id: req.headers.authorization
//             }
//         })

//         const savedImage = await user.getImages()
//         res.json((images))

//     }catch (error) {
//         console.log(error);
//         res.status(400).json({ error: error.mesaage })
//     }
// }



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
