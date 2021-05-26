const models = require ('../models')
const userControllers = {}


//signup
userControllers.create = async (req, res) => {
  console.log(req.body)
    try {
        const user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,

        })
        res.json({user})
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

//login
userControllers.login = async(req, res) => {
    try {
      const user = await models.user.findOne({
        where: { email: req.body.email }
      })

      if (user.password === req.body.password) {
        console.log(user)
        res.json({ user, message: 'login successful' })
      } else {
        res.status(401).json({ message: 'login failed, try again' })
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message })
    }
  }

  //logout
  userControllers.logout = async(req, res) => {
    try {
      const user = await models.user.findOne({
        where: { id: req.headers.authorization }
      })
      console.log(user)

      if (user) {
        res.json({ message: 'logged out successful' })
      } else {
        res.status(404).json({ message: 'user not found, try again' })
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message })
    }
  }

  userControllers.verify = async(req, res) => {
    try {
      const user = await models.user.findOne({
        where: { id: req.headers.authorization }
      })
      console.log(user)

      if (user) {
        res.json({ user, message: 'user found' })
      } else {
        res.status(404).json({ message: 'user not found, try again' })
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message })
    }
  }







module.exports = userControllers;
