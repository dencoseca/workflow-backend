const router = require('express').Router({ mergeParams: true })
const Task = require('../models/Task')
const Project = require('../models/Project')

// INDEX
router.get('/findall', (req, res) => {
  Task.find({ projectId: req.body.projectId }, (err, tasks) => {
    if (err) {
      res.send({ errorMessage: 'A naughty Mongoose got in the way! Please wait a few seconds and try again...' })
    } else {
      res.send(tasks)
    }
  })
})

// CREATE
router.post('/create', (req, res) => {
  Project.findOne({ _id: req.body.projectId }, (err, project) => {
    if (err) {
      res.send({ errorMessage: "Hmmmm, that's strange, this project doesn't exist anymore" })
    } else {
      Task.create({ ...req.body }, (err, task) => {
        if (err) {
          console.log(err)
          res.send({ errorMessage: 'Cannot have empty fields' })
        } else {
          project.tasks.push(task)
          project.save()
          res.send(task)
        }
      })
    }
  })
})

// UPDATE
router.post('/update', (req, res) => {
  Task.findByIdAndUpdate(req.body.taskId, req.body.task, (err, task) => {
    if (err) {
      res.send({ errorMessage: 'A naughty Mongoose got in the way! Please wait a few seconds and try again...' })
    } else {
      Task.findOne(task._id, (err, updatedTask) => {
        if (err) {
          res.send({ errorMessage: 'A naughty Mongoose got in the way! Please wait a few seconds and try again...' })
        } else {
          res.send({ successMessage: 'Task successfully updated', updatedTask })
        }
      })
    }
  })
})

// DELETE
router.post('/delete', (req, res) => {
  Task.findByIdAndDelete(req.body.taskId, (err, deletedTask) => {
    if (err) {
      res.send({ errorMessage: 'A naughty Mongoose got in the way! Please wait a few seconds and try again...' })
    } else {
      res.send({ successMessage: 'Task successfully deleted', deletedTask })
    }
  })
})

module.exports = router
