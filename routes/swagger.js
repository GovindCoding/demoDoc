const express = require('express')
const router = express.Router()

const options = {
  swaggerDefinition: {
    info: {
      title: 'REST - PKI services',
      version: '1.0.0',
      description: 'REST API with Swagger doc',
      contact: {
        email: ''
      }
    },
    tags: [
      {
        name: 'User',
        description: 'User Management API'
      },
      {
        name: 'Policy',
        description: 'Policy API'
      },
      {
        name: 'Certificate',
        description: 'Certificate Management API'
      }
    ],
    schemes: ['http'],
    host: 'localhost:3007',
    basePath: '/pki/api/v1'
  },
  apis: ['./routes/api-routes.js']
}

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = swaggerJSDoc(options)
require('swagger-model-validator')(swaggerSpec)

router.get('/json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

function validateModel (name, model) {
  const responseValidation = swaggerSpec.validateModel(name, model, false, true)
  if (!responseValidation.valid) {
    console.error(responseValidation.errors)
    throw new Error("Model doesn't match Swagger contract")
  }
}

module.exports = {
  router,
  validateModel
}
