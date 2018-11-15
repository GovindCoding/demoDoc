/* Module Dependencies */
var express = require('express')
var bodyParser = require('body-parser')
var expressSession = require('express-session')
var cors = require('cors')
var logger = require('./utils/logger')
require('dotenv').load()

var swagger = require('./routes/swagger')

/* Initializing Express App */
var app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(bodyParser.raw({
  limit: '10000kb'
}))
app.use(bodyParser.text())
app.use(expressSession({
  secret: 'SOAPRequestNodeJSPOC',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}))
app.use(cors())
// API ROUTES
app.use('/api/docs', swagger.router)
app.use('/', require('./routes/api-routes'))

// handling 404
app.use(function (req, res) {
  res.status(404).send({
    status_code: 404,
    status: 'API not found'
  })
})

/* Creating http  Server */
app.listen(process.env.HTTP_PORT)
logger.info('Server started on port :' + process.env.HTTP_PORT)
module.exports = app
