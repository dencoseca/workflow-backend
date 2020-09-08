const router = require('express').Router({ mergeParams: true })
const Task = require('../models/Task')
const Project = require('../models/Project')

// INDEX
router.get('/findall', (req, res) => {
  Task.find({ projectId: req.body.projectId }, (err, tasks) => {
    if (err) {
      res.send({ errorMessage: 'Mongoose threw an error trying to find all the tasks' })
    } else {
      res.send(tasks)
    }
  })
})

// CREATE
router.post('/create', (req, res) => {
  Project.findOne({ _id: req.body.projectId }, (err, project) => {
    if (err) {
      res.send({ errorMessage: "Hmmmm, that's strange, this project doesn't exist" })
    } else {
      Task.create(req.body, (err, task) => {
        if (err) {
          res.send({ errorMessage: 'Mongoose threw an error trying to create a task' })
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
      res.send({ errorMessage: 'Mongoose threw an error trying to update a task' })
    } else {
      Task.findOne(task._id, (err, updatedTask) => {
        if (err) {
          res.send({ errorMessage: 'Mongoose threw an error trying to find a task' })
        } else {
          res.send(updatedTask)
        }
      })
    }
  })
})

// DELETE
router.post('/delete', (req, res) => {
  Task.findByIdAndDelete(req.body.taskId, (err, deletedTask) => {
    if (err) {
      res.send({ errorMessage: 'Mongoose threw an error trying to delete they tas' })
    } else {
      res.send({ successMessage: 'Task successfully deleted', deletedTask })
    }
  })
})

module.exports = router
