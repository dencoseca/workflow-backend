const router = require('express').Router({ mergeParams: true })
const User = require('../models/User')

// CREATE
router.post('/signup', async (req, res) => {
  const userExists = await User.find({ username: req.body.username })
  if (userExists.length > 0) {
    res.send({ errorMessage: 'User with that name already exists' })
  } else {
    User.create(req.body, (err, user) => {
      if (err) {
        res.send({ errorMessage: 'Mongoose threw an error trying to create a new user' })
      } else {
        res.send({ successMessage: `Hi ${user.username}, you're all signed up!`, user })
      }
    })
  }
})

// SHOW
router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
    if (err) {
      res.send({ errorMessage: 'Mongoose threw an error trying to find a user' })
    } else if (user == null) {
      res.send({ errorMessage: 'Username or password are incorrect' })
    } else {
      res.send(user)
    }
  })
})

module.exports = router
