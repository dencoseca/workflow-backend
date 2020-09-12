const router = require('express').Router({ mergeParams: true })
const Project = require('../models/Project')
const Task = require('../models/Task')
const User = require('../models/User')

// INDEX
router.post('/findall', (req, res) => {
  Project.find({ userId: req.body.userId }, (err, projects) => {
    if (err) {
      res.send({ errorMessage: 'A naughty Mongoose got in the way! Please wait a few seconds and try again...' })
    } else {
      res.send(projects)
    }
  })
})

// SHOW
router.post('/findone', (req, res) => {
  Project.findOne({ _id: req.body.projectId })
    .populate('tasks')
    .exec((err, project) => {
      if (err) {
        res.send({ errorMessage: 'A naughty Mongoose got in the way! Please wait a few seconds and try again...' })
        console.log(err)
      } else if (project == null) {
        res.send({ errorMessage: 'Cannot find project with that name' })
      } else {
        res.send(project)
      }
    })
})

// CREATE
router.post('/create', async (req, res) => {
  const projectExists = await Project.find({ userId: req.body.userId, name: req.body.name })
  if (projectExists.length > 0) {
    res.send({ errorMessage: 'Project with that name already exists' })
  } else {
    User.findOne({ _id: req.body.userId }, (err, user) => {
      if (err) {
        res.send({ errorMessage: 'Cannot find a user with that name' })
      } else {
        Project.create(req.body, (err, project) => {
          if (err) {
            res.send({ errorMessage: 'A naughty Mongoose got in the way! Please wait a few seconds and try again...' })
          } else {
            user.projects.push(project)
            user.save()
            res.send(project)
          }
        })
      }
    })
  }
})

// UPDATE
router.post('/update', (req, res) => {
  Project.findByIdAndUpdate(req.body.projectId, req.body.project, (err, project) => {
    if (err) {
      res.send({ errorMessage: 'A naughty Mongoose got in the way! Please wait a few seconds and try again...' })
    } else {
      Project.findOne(project._id, (err, updatedProject) => {
        if (err) {
          res.send({ errorMessage: 'A naughty Mongoose got in the way! Please wait a few seconds and try again...' })
        } else {
          res.send({ successMessage: 'Project successfully updated', updatedProject })
        }
      })
    }
  })
})

// DELETE
router.post('/delete', (req, res) => {
  Project.findByIdAndDelete(req.body.projectId, (err, deletedProject) => {
    if (err) {
      res.send({ errorMessage: 'A naughty Mongoose got in the way! Please wait a few seconds and try again...' })
    } else if (!deletedProject) {
      res.send({ errorMessage: 'Project deletion unsuccessful' })
    } else {
      Task.deleteOne(
        {
          _id: {
            $in: deletedProject.tasks
          }
        },
        err => {
          if (err) {
            console.log('Unable to delete tasks')
          }
        }
      )
      res.send({ successMessage: 'Project deleted successfully', deletedProject })
    }
  })
})

module.exports = router
