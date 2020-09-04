// =====================
// REQUIREMENTS
// =====================

// APP
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

// IMPORT ROUTES
const userRoutes = require('./routes/user')
const projectRoutes = require('./routes/project')
const taskRoutes = require('./routes/task')

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

// MIDDLEWARE CONFIG
app.use(cors())
app.use(bodyParser.json())

// =====================
// ROUTER CONFIG
// =====================

app.get('/', (req, res) => {
  res.send('server running')
})

app.use('/user', userRoutes)
app.use('/project', projectRoutes)
app.use('/task', taskRoutes)

// =====================
// START SERVER
// =====================

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`)
})
