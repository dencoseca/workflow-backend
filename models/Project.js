const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    tasks: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }
  },
  { timestamps: true }
)

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
