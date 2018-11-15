const soapUtil = require('../utils/soapUtil')
const logger = require('../utils/logger')
const MODULE_NAME = 'certificateManager'
let certificateManager = {}

/**
 * Adds two numbers.
 * @param {any} req request format.
 * @param {any} res response format.
 * @return {any} Returns response.
 * @type {number}
 */
certificateManager.searchCertificate = async function (req, res) {
  const SERVICE_NAME = 'searchCertificate'
  logger.info(MODULE_NAME + ' :: Entering into searchCertificate()')
  let response = {}
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'certificatemanagement', process.env.CERTIFICATE_MANAGEMENT_SERVICE_WSDL)
    var reqParams = {}
    reqParams.searchCertificateRequest = {}
    reqParams.searchCertificateRequest.startIndex = reqData.startIndex
    reqParams.searchCertificateRequest.seatId = reqData.seatId
    reqParams.searchCertificateRequest.version = reqData.version

    if (reqData.clientTransactionID) {
      reqParams.searchCertificateRequest.clientTransactionID = reqData.clientTransactionID // optional param
    }

    if (reqData.seatId) {
      reqParams.searchCertificateRequest.seatId = reqData.seatId // optional param
    }

    if (reqData.accountId) {
      reqParams.searchCertificateRequest.accountId = reqData.accountId // optional param
    }

    if (reqData.profileOID) {
      reqParams.searchCertificateRequest.profileOID = reqData.profileOID // optional param
    }

    if (reqData.commonName) {
      reqParams.searchCertificateRequest.commonName = reqData.commonName // optional param
    }

    if (reqData.status) {
      reqParams.searchCertificateRequest.status = reqData.status // optional param
    }

    if (reqData.emailAddress) {
      reqParams.searchCertificateRequest.emailAddress = reqData.emailAddress // optional param
    }

    if (reqData.serialNumber) {
      reqParams.searchCertificateRequest.serialNumber = reqData.serialNumber // optional param
    }

    if (reqData.issuingCA) {
      reqParams.searchCertificateRequest.issuingCA = reqData.issuingCA // optional param
    }

    if (reqData.validFrom) {
      reqParams.searchCertificateRequest.validFrom = reqData.validFrom // optional param
    }

    if (reqData.validTo) {
      reqParams.searchCertificateRequest.validTo = reqData.validTo // optional param
    }

    if (reqData.startIndex) {
      reqParams.searchCertificateRequest.startIndex = reqData.startIndex // optional param
    }

    if (reqData.version) {
      reqParams.searchCertificateRequest.version = reqData.version// optional param
    }

    client.searchCertificate(reqParams, function (err, result, envelope, soapHeader) {
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while searching certificate. Error::' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Search certificate successfully.')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while searching certificate. Error::' + err)
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
certificateManager.bulkUpdateCertificateStatus = async function (req, res) {
  const SERVICE_NAME = 'bulkUpdateCertificateStatus'
  logger.info(MODULE_NAME + ' :: Entering into bulkUpdateCertificateStatus()')
  let response = {}
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'certificatemanagement', process.env.CERTIFICATE_MANAGEMENT_SERVICE_WSDL)
    var reqParams = {}
    reqParams.bulkUpdateCertificateStatusRequest = {}
    reqParams.bulkUpdateCertificateStatusRequest.clientTransactionID = reqData.clientTransactionID
    reqParams.bulkUpdateCertificateStatusRequest.version = reqData.version
    reqParams.bulkUpdateCertificateStatusRequest.revocationReason = reqData.revocationReason
    reqParams.bulkUpdateCertificateStatusRequest.comment = reqData.comment

    if (reqData.certificateSerialNumber) {
      reqParams.bulkUpdateCertificateStatusRequest.certificateSerialNumber = []
      reqData.certificateSerialNumber.forEach(function (certSrNo) {
        reqParams.bulkUpdateCertificateStatusRequest.certificateSerialNumber.push(certSrNo)
      })
    }

    if (reqData.seatId) {
      reqParams.bulkUpdateCertificateStatusRequest.seatId = []
      reqData.seatId.forEach(function (seatId) {
        reqParams.bulkUpdateCertificateStatusRequest.seatId.push(seatId)
      })
    }

    if (reqData.profileOID) {
      reqParams.bulkUpdateCertificateStatusRequest.profileOID = []
      reqData.seatId.forEach(function (profOID) {
        reqParams.bulkUpdateCertificateStatusRequest.profileOID.push(profOID)
      })
    }

    reqParams.bulkUpdateCertificateStatusRequest.operationType = reqData.operationType

    client.bulkUpdateCertificateStatus(reqParams, function (err, result, envelope, soapHeader) {
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while bulk update certificate status. Error::' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Bulk update certificate status successfully.')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while bulk update certificate status. Error::' + err)
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
certificateManager.keyRecovery = async function (req, res) {
  const SERVICE_NAME = 'keyRecovery'
  logger.info(MODULE_NAME + ' :: Entering into keyRecovery()')
  let response = {}
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'certificatemanagement', process.env.CERTIFICATE_MANAGEMENT_SERVICE_WSDL)
    var reqParams = {}
    reqParams.requestKeyRecoveryMessage = {}
    reqParams.requestKeyRecoveryMessage.clientTransactionID = reqData.clientTransactionID
    reqParams.requestKeyRecoveryMessage.pKCS12Password = reqData.pKCS12Password
    reqParams.requestKeyRecoveryMessage.certificateSerialNumber = reqData.certificateSerialNumber
    reqParams.requestKeyRecoveryMessage.certificateIssuer = reqData.certificateIssuer
    reqParams.requestKeyRecoveryMessage.adminID = reqData.adminID
    reqParams.requestKeyRecoveryMessage.version = reqData.version

    client.keyRecovery(reqParams, function (err, result, envelope, soapHeader) {
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while key recovery. Error::' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Key recovery successfully.')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while bulk update certificate status. Error::' + err)
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
 */
certificateManager.updateCertificateStatus = async function (req, res) {
  const SERVICE_NAME = 'updateCertificateStatus'
  logger.info(MODULE_NAME + ' :: Entering into updateCertificateStatus()')
  let response = {}
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'certificatemanagement', process.env.CERTIFICATE_MANAGEMENT_SERVICE_WSDL)
    var reqParams = {}
    reqParams.updateCertificateStatusRequest = {}
    reqParams.updateCertificateStatusRequest.clientTransactionID = reqData.clientTransactionID
    reqParams.updateCertificateStatusRequest.version = reqData.version

    if (reqData.certificateIssuer) {
      reqParams.updateCertificateStatusRequest.certificateIssuer = reqData.certificateIssuer // optional param
    }
    if (reqData.revocationReason) {
      reqParams.updateCertificateStatusRequest.revocationReason = reqData.revocationReason // optional param
    }

    if (reqData.challenge) {
      reqParams.updateCertificateStatusRequest.challenge = reqData.challenge // optional param
    }

    if (reqData.comment) {
      reqParams.updateCertificateStatusRequest.comment = reqData.comment // optional param
    }

    if (reqData.seatId) {
      reqParams.updateCertificateStatusRequest.seatId = reqData.seatId // optional param
    }

    reqParams.updateCertificateStatusRequest.certificateSerialNumber = reqData.certificateSerialNumber
    reqParams.updateCertificateStatusRequest.operationType = reqData.operationType

    client.updateCertificateStatus(reqParams, function (err, result, envelope, soapHeader) {
      // console.log(client.lastRequest)
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while update certificate status. Error::' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Update certificate status successfully.')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while update certificate status. Error::' + err)
    response.status = 'ERROR'
    response.errorDescription = err
    res.send(response)
  }
}

module.exports = certificateManager
