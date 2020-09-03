const router = require('express').Router({ mergeParams: true })
const Project = require('../models/Project')

router.post('/', async (req, res) => {
  const projectExists = await Project.find({ name: req.body.name })
  if (projectExists.length > 0) {
    const newErr = new Error()
    newErr.message = 'Project with that name already exists'
    res.send(newErr)
  } else {
    Project.create(req.body, (err, project) => {
      if (err) {
        console.log(err)
        err.message = 'Failed to create new project'
        res.send(err)
      }
      res.send(project)
    })
  }
})

module.exports = router
