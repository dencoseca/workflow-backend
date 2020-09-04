const router = require('express').Router({ mergeParams: true })
const Project = require('../models/Project')

// INDEX
router.get('/findall', (req, res) => {
  Project.find({ author: req.body.author }, (err, projects) => {
    if (err) res.send({ message: 'Mongoose threw an error while finding all projects' })
    res.send(projects)
  })
})

// SHOW
router.get('/findsingle', (req, res) => {
  Project.findbyId(req.body.id, (err, project) => {
    if (err) res.send({ message: 'Mongoose threw an error while finding a single project' })
    if (project == null) res.send({ message: 'Cannot find project with that name' })
    res.send(project)
  })
})

// CREATE
router.post('/create', async (req, res) => {
  const projectExists = await Project.find({ author: req.body.author, name: req.body.name })
  if (projectExists.length > 0) res.send({ message: 'Project with that name already exists' })
  Project.create(req.body, (err, project) => {
    if (err) res.send({ message: 'Mongoose threw an error trying to create the project' })
    res.send(project)
  })
})

// UPDATE
router.post('/update', (req, res) => {
  Project.findByIdAndUpdate(req.body.id, req.body.project, (err, project) => {
    if (err) res.send({ message: 'Mongoose threw an error trying to update the project' })
    Project.findOne(project._id, (err, updatedProject) => {
      if (err) res.send({ message: 'Mongoose threw an error trying to find updated project' })
      res.send(updatedProject)
    })
  })
})

// DELETE
router.delete('/delete', (req, res) => {
  Project.findByIdAndDelete(req.body.id, err => {
    if (err) res.send({ message: 'Mongoose threw an error trying to delete project' })
    res.send({ message: 'Project deleted successfully' })
  })
})

module.exports = router
