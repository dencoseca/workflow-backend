const router = require('express').Router({ mergeParams: true })
const Task = require('../models/Task')

// INDEX
router.get('/findall', (req, res) => {
  Task.find({ projectId: req.body.projectId }, (err, tasks) => {
    if (err) {
      console.log(err)
      err.message = 'Mongoose threw an error trying to find all the tasks'
      res.send(err)
    }
    res.send(tasks)
  })
})

// CREATE
router.post('/create', (req, res) => {
  Task.create(req.body, (err, task) => {
    if (err) {
      console.log(err)
      err.message = 'Mongoose threw an error trying to create a task'
      res.send(err)
    }
    res.send(task)
  })
})

module.exports = router
