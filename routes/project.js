const router = require('express').Router({ mergeParams: true })
const Project = require('../models/Project')

// CREATE
router.post('/', async (req, res) => {
  const projectExists = await Project.find({ author: req.body.author, name: req.body.name })
  if (projectExists.length > 0) {
    const newErr = new Error()
    newErr.message = 'Project with that name already exists'
    res.send(newErr)
  } else {
    Project.create(req.body, (err, project) => {
      if (err) {
        console.log(err)
        res.send(err)
      }
      res.send(project)
    })
  }
})

// SHOW
router.get('/', (req, res) => {
  Project.findOne({ author: req.body.author, name: req.body.name }, (err, project) => {
    if (err) {
      console.log(err)
      err.message = 'Something went wrong with mongoose'
      res.send(err)
    }
    if (project == null) {
      const newErr = new Error()
      newErr.message = 'Cannot find project with that name'
      res.send(newErr)
    }
    res.send(project)
  })
})

module.exports = router
