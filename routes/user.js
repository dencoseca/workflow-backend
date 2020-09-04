const router = require('express').Router({ mergeParams: true })
const User = require('../models/User')

// CREATE
router.post('/', async (req, res) => {
  const userExists = await User.find({ username: req.body.username })
  if (userExists.length > 0) {
    res.send({ message: 'User with that name already exists' })
  } else {
    User.create(req.body, (err, user) => {
      if (err) res.send({ message: 'Mongoose threw an error trying to create a new user' })
      res.send(user)
    })
  }
})

// SHOW
router.get('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.send({ message: 'Mongoose threw an error trying to find a user' })
    } else if (user == null) {
      res.send({ message: 'Cannot find user with that name' })
    } else {
      res.send(user)
    }
  })
})

module.exports = router
