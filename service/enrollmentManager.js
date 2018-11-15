const soapUtil = require('../utils/soapUtil')
const logger = require('../utils/logger')
const MODULE_NAME = 'enrollmentManager'
let enrollment = {}

/**
 * Adds two numbers.
 * @param {any} req request format.
 * @param {any} res response format.
 * @return {any} Returns response.
 */
enrollment.requestSecurityToken = async function (req, res) {
  const SERVICE_NAME = 'requestSecurityToken'
  logger.info(MODULE_NAME + ' :: Entering into requestSecurityToken()')
  let response = {}
  require('request').debug = true
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'enrollment', process.env.ENROLLMENT_WSDL_1)
    let reqParams = {}
    reqParams.requestVSSecurityToken = {}
    reqParams.requestVSSecurityToken.$attributes = { 'xmlns': 'http://schemas.verisign.com/pkiservices/2009/07/enrollment' }
    reqParams.requestVSSecurityToken.certificateProfileID = reqData.certificateProfileID
    reqParams.requestVSSecurityToken.clientTransactionID = reqData.clientTransactionID
    reqParams.requestVSSecurityToken.tokenType = reqData.tokenType
    reqParams.requestVSSecurityToken.requestType = reqData.requestType
    reqParams.requestVSSecurityToken.binarySecurityToken = {
      $attributes: {
        ValueType: 'http://schemas.verisign.com/pkiservices/2009/07/PKCS10'

      },
      $value: reqData.binarySecurityToken }
    reqParams.requestVSSecurityToken.nameValuePair = []
    reqData.nameValuePair.forEach(function (pair) {
      reqParams.requestVSSecurityToken.nameValuePair.push(pair)
    })
    reqParams.requestVSSecurityToken.version = reqData.version
    client.RequestSecurityToken(reqParams, function (err, result, envelope, soapHeader) {
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while request security token. Error :' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Request security token successfully.')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while request security token. Error :' + err)
    response.status = 'ERROR'
    response.errorDescription = err
    res.send(response)
  }
}

module.exports = enrollment
