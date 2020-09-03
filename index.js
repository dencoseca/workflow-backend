// =====================
// REQUIREMENTS
// =====================

// APP
const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  dotenv = require('dotenv').config()

// IMPORT ROUTES
const userRoutes = require('./routes/user'),
  projectRoutes = require('./routes/project'),
  taskRoutes = require('./routes/task')

// =====================
// APP CONFIG
// =====================

// DATABASE CONFIG
const databaseName = 'workflow'
const loginDetails = process.env.MONGODBLOGIN

mongoose.connect(`mongodb+srv://${loginDetails}@projectdeploycluster-zaz5i.mongodb.net/${databaseName}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// =====================
// ROUTER CONFIG
// =====================

app.get('/', (req, res) => {
  res.send('server running')
})

app.use('/user', userRoutes)
app.use('/:username', projectRoutes)
app.use('/:username/:projectName/tasks', taskRoutes)

// =====================
// START SERVER
// =====================

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`)
})
