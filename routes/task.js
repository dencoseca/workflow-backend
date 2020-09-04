const router = require('express').Router({ mergeParams: true })
const Task = require('../models/Task')

// INDEX
router.get('/findall', (req, res) => {
  Task.find({ projectId: req.body.projectId }, (err, tasks) => {
    if (err) {
      res.send({ message: 'Mongoose threw an error trying to find all the tasks' })
    } else {
      res.send(tasks)
    }
  })
})

// CREATE
router.post('/create', (req, res) => {
  Task.create(req.body, (err, task) => {
    if (err) {
      res.send({ message: 'Mongoose threw an error trying to create a task' })
    } else {
      res.send(task)
    }
  })
})

// UPDATE
router.post('/update', (req, res) => {
  Task.findByIdAndUpdate(req.body.id, req.body.task, (err, task) => {
    if (err) {
      res.send({ message: 'Mongoose threw an error trying to update a task' })
    } else {
      Task.findOne(task._id, (err, updatedTask) => {
        if (err) {
          res.send({ message: 'Mongoose threw an error trying to find a task' })
        } else {
          res.send(updatedTask)
        }
      })
    }
  })
})

// DELETE
router.delete('/delete', (req, res) => {
  Task.findByIdAndDelete(req.body.id, err => {
    if (err) {
      res.send({ message: 'Mongoose threw an error trying to delete they tas' })
    } else {
      res.send({ message: 'Task successfully deleted' })
    }
  })
})

module.exports = router
