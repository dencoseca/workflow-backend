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
                res.send({ errorMessage: 'A naughty Mongoose got in the way! Please wait a few seconds and try again...' })
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
            res.send({ errorMessage: 'A naughty Mongoose got in the way! Please wait a few seconds and try again...' })
        } else if (user == null) {
            res.send({
                errorMessage:
                    'Either Username or password are incorrect... or you\'re not real? Describe in single words only the good things that come to mind about your mother'
            })
        } else {
            res.send(user)
        }
    })
})

module.exports = router
