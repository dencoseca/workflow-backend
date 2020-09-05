const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
