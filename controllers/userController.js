require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../models')

const userController = {}

userController.signUp = async (req, res) => {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10)
      const u = await models.user.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      })
      const userCart = await models.cart.create({
          userId: u.id
      })
      await u.setCart(userCart)
      const encryptedId = jwt.sign({ userId: u.id }, process.env.JWT_SECRET)
      const user = {id: encryptedId, name: u.name, email: u.email, city: u.city, state: u.state, zip: u.zip,cart:userCart}
      res.json({message: 'Signed up', user:user })
    } catch (error) {
      res.json(error)
      // res.status(400)
      // res.json({ error: 'You used that email already, silly.' })
    }
}
