const path = require('path')
let soap = require('strong-soap').soap
const logger = require('./logger')
const Busboy = require('busboy')
const MODULE_NAME = 'soapUtil'
let soapUtil = {}

soapUtil.getClient = function (folderName, filePath) {
  const SERVICE_NAME = 'getClient'
  logger.info(MODULE_NAME + ' :: Entering into getClient()')
  require('request').debug = false
  let url = path.join(__dirname, 'wsdl', folderName, filePath)
  let wsdlOptions = {
    attributesKey: '$attributes',
    valueKey: '$value',
    xmlKey: '$xml'

  }
  return new Promise((resolve, reject) => {
    soap.createClient(url, wsdlOptions, function (err, client) {
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while creating client. Error :' + err)
        reject(err)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Client created successfully.')
        client.setSecurity(new soap.ClientSSLSecurity(path.join(__dirname, 'certificates', process.env.KEY_FILE_NAME), path.join(__dirname, 'certificates', process.env.CRT_FILE_NAME)))
        resolve(client)
      }
    })
  })
}

soapUtil.getSOAPClient = function (folderName, filePath, key, cert) {
  const SERVICE_NAME = 'getSOAPClient'
  logger.info(MODULE_NAME + ' :: Entering into getSOAPClient()')
  require('request').debug = false
  let url = path.join(__dirname, 'wsdl', folderName, filePath)
  let wsdlOptions = {
    attributesKey: '$attributes',
    valueKey: '$value',
    xmlKey: '$xml'

  }
  return new Promise((resolve, reject) => {
    soap.createClient(url, wsdlOptions, function (err, client) {
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while creating client. Error :' + err)
        reject(err)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Client created successfully.')
        client.setSecurity(new soap.ClientSSLSecurity(key, cert))
        resolve(client)
      }
    })
  })
}

soapUtil.fileUpload = function (req, callback) {
  logger.info(MODULE_NAME + ' :: Entering into fileUpload()')
  let keyFile = ''
  let certFile = ''
  let fieldObj = null
  let busboy = new Busboy({ headers: req.headers })
  busboy.on('file', function (fieldname, file, filename) {
    file.on('data', function (data) {
      if (fieldname === 'key') {
        keyFile = data
      } else {
        certFile = data
      }
    })
    file.on('end', function () {})
  })
  busboy.on('field', function (key, val) {
    fieldObj = JSON.parse(val)
  })

  busboy.on('finish', function () {
    var response = {}
    response.keyFile = keyFile
    response.certFile = certFile
    response.fieldObj = fieldObj
    callback(response)
  })
  req.pipe(busboy)
}

soapUtil.getSOAPClientAndReqData = function (req, folderName, filePath) {
  const SERVICE_NAME = 'getSOAPClientAndReqData'
  logger.info(MODULE_NAME + ' :: Entering into getSOAPClientAndReqData()')
  require('request').debug = false
  return new Promise((resolve, reject) => {
    try {
      soapUtil.fileUpload(req, async function (reqData) {
        let client = await soapUtil.getSOAPClient(folderName, filePath, reqData.keyFile, reqData.certFile)
        resolve([client, reqData.fieldObj])
      })
    } catch (error) {
      logger.error(MODULE_NAME + ' ::' + SERVICE_NAME + ' :: Error while get soap client and data. Error::' + error)
      reject(error)
    }
  })
}

module.exports = soapUtil
