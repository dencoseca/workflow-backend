const router = require('express').Router({ mergeParams: true })
const Project = require('../models/Project')
const Task = require('../models/Task')

// INDEX
router.post('/findall', (req, res) => {
  Project.find({ userId: req.body.userId }, (err, projects) => {
    if (err) {
      res.send({ errorMessage: 'Mongoose threw an error while finding all projects' })
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
        res.send({ errorMessage: 'Mongoose threw an error while finding a single project' })
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
    Project.create(req.body, (err, project) => {
      if (err) {
        res.send({ errorMessage: 'Mongoose threw an error trying to create the project' })
      } else {
        res.send(project)
      }
    })
  }
})

// UPDATE
router.post('/update', (req, res) => {
  Project.findByIdAndUpdate(req.body.projectId, req.body.project, (err, project) => {
    if (err) {
      res.send({ errorMessage: 'Mongoose threw an error trying to update the project' })
    } else {
      Project.findOne(project._id, (err, updatedProject) => {
        if (err) {
          res.send({ errorMessage: 'Mongoose threw an error trying to find updated project' })
        } else {
          res.send(updatedProject)
        }
      })
    }
  })
})

// DELETE
router.post('/delete', (req, res) => {
  Project.findByIdAndDelete(req.body.projectId, (err, deletedProject) => {
    if (err) {
      res.send({ errorMessage: 'Mongoose threw an error trying to delete project' })
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
