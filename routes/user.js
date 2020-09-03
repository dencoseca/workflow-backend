const router = require('express').Router({ mergeParams: true })
const User = require('../models/User')

// CREATE
router.post('/', async (req, res) => {
  // Check that username isn't already in use
  const userExists = await User.find({ username: req.body.username })
  if (userExists.length > 0) {
    const newErr = new Error()
    newErr.message = 'User with the name already exists'
    res.send(newErr)
  } else {
    // Create a new user and respond with user
    User.create(req.body, (err, user) => {
      if (err) {
        console.log(err)
        err.message = 'Failed to create new user'
        res.send(err)
      }
      res.send(user)
    })
  }
})

// SHOW
router.get('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      console.log(err)
      res.send(err)
    }
    if (user == null) {
      const newErr = new Error()
      newErr.message = 'Cannot find user with that name'
      res.send(newErr)
    }
    res.send(user)
  })
})

module.exports = router
