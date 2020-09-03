const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    value: String,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    categories: [String],
    status: [String]
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
