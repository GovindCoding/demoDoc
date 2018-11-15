/**
 * PolicyManager class that helps to work with certificate policy.
 */
const soapUtil = require('../utils/soapUtil')
const logger = require('../utils/logger')
const MODULE_NAME = 'policyManager'
let policyManager = {}

/**
 * Adds two numbers.
 * @param {any} req request format.
 * @param {any} res response format.
 * @return {any} Returns response.
 */
policyManager.getPolicy = async function (req, res) {
  const SERVICE_NAME = 'getPolicy'
  logger.info(MODULE_NAME + ' :: Entering into getPolicy()')
  let response = {}
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'policy', process.env.CERTIFICATE_MANAGEMENT_WSDL)
    let reqParams = {}
    reqParams.getPolicies = {}
    reqParams.getPolicies.clientTransactionID = reqData.clientTransactionID

    if ((reqData.lastUpdatetime) || (reqData.preferredLanguage)) {
      reqParams.getPolicies.client = {} // optional param
      if (reqData.lastUpdatetime) {
        reqParams.getPolicies.client.lastUpdatetime = reqData.lastUpdatetime // optional param
      }
      if (reqData.preferredLanguage) {
        reqParams.getPolicies.client.preferredLanguage = reqData.preferredLanguage // optional param
      }
    }
    reqParams.getPolicies.requestFilter = {}

    // reqParams.getPolicies.requestFilter.policyIDs = []

    // reqData.policyIDs.forEach(function (policy) {
    //   console.log('policy: ' + JSON.stringify(policy))
    //   reqParams.getPolicies.requestFilter.policyIDs.push(policy)
    // })

    reqParams.getPolicies.requestFilter.policyIDs = {}
    reqParams.getPolicies.requestFilter.policyIDs.oid = reqData.oid

    // reqParams.getPolicies.requestFilter.policyIDs.oid = []
    // reqData.oid.forEach(function (oid) {
    //   reqParams.getPolicies.requestFilter.policyIDs.oid.push(oid)
    // })

    if (reqData.signResponse) {
      reqParams.getPolicies.signResponse = reqData.signResponse // optional param
    }
    reqParams.getPolicies.version = reqData.version

    client.requestPolicies(reqParams, function (err, result, envelope, soapHeader) {
      // console.log(client.lastRequest)
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while getting policy. Error :' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Getting policy successfully.')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while getting policy. Error :' + err)
    response.status = 'ERROR'
    response.errorDescription = err
    res.send(response)
  }
}

/**
 * Adds two numbers.
 * @param {any} req request format.
 * @param {any} res response format.
 * @return {any} Returns response.
 * @type {number}
 */
policyManager.getAllPolicy = async function (req, res) {
  const SERVICE_NAME = 'getAllPolicy'
  logger.info(MODULE_NAME + ' :: Entering into getAllPolicy()')
  let response = {}
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'policy', process.env.CERTIFICATE_MANAGEMENT_WSDL)
    let reqParams = {}
    reqParams.getPolicies = {}
    reqParams.getPolicies.clientTransactionID = reqData.clientTransactionID

    if ((reqData.lastUpdatetime) || (reqData.preferredLanguage)) {
      reqParams.getPolicies.client = {} // optional param
      if (reqData.lastUpdatetime) {
        reqParams.getPolicies.client.lastUpdatetime = reqData.lastUpdatetime // optional param
      }
      if (reqData.preferredLanguage) {
        reqParams.getPolicies.client.preferredLanguage = reqData.preferredLanguage // optional param
      }
    }

    reqParams.getPolicies.version = reqData.version
    reqParams.getPolicies.requestFilter = reqData.requestFilter

    if (reqData.signResponse) {
      reqParams.getPolicies.signResponse = reqData.signResponse // optional param
    }

    client.requestPolicies(reqParams, function (err, result, envelope, soapHeader) {
      // console.log(client.lastRequest)
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while getting all policy. Error :' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Getting all policy successfully.')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while getting all policy. Error :' + err)
    response.status = 'ERROR'
    response.errorDescription = err
    res.send(response)
  }
}

module.exports = policyManager
