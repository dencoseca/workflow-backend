const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    value: { type: String, required: true },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    category: { type: String, required: true },
    status: { type: String, required: true }
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
