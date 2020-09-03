const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    projects: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
