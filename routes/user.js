const router = require('express').Router({ mergeParams: true })
const User = require('../models/User')

router.post('/', (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      console.log(err)
      err.message = 'Failed to create new user'
      res.send({ err })
    }
    res.send({ user })
  })
})

module.exports = router
