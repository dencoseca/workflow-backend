// =====================
// REQUIREMENTS
// =====================

// APP
const express = require('express'),
  app = express(),
  mongoose = require('mongoose')

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
// START SERVER
// =====================

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`)
})
