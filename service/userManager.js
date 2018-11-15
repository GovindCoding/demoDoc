const soapUtil = require('../utils/soapUtil')
const logger = require('../utils/logger')
const MODULE_NAME = 'userManager'
let userManager = {}

/**
 * Adds two numbers.
 * @param {any} req request format.
 * @param {any} res response format.
 * @return {any} Returns response.
 */
userManager.getUser = async function (req, res) {
  const SERVICE_NAME = 'getUser'
  logger.info(MODULE_NAME + ' :: Entering into getUser()')
  let response = {}
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'usermanagement', process.env.USER_MANAGEMENT_WSDL)
    let reqParams = {}
    reqParams.getUserInformationRequest = {}
    reqParams.getUserInformationRequest.clientTransactionID = reqData.clientTransactionID
    reqParams.getUserInformationRequest.seatId = reqData.seatId
    reqParams.getUserInformationRequest.version = reqData.version
    client.getUserInformation(reqParams, function (err, result, envelope, soapHeader) {
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while getting user information. Error :' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: User information getting successfully.')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while getting user information. Error :' + err)
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
userManager.createOrUpdatePasscode = async function (req, res) {
  const SERVICE_NAME = 'createOrUpdatePasscode'
  logger.info(MODULE_NAME + ' :: Entering into createOrUpdatePasscode()')
  let response = {}
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'usermanagement', process.env.USER_MANAGEMENT_WSDL)
    let reqParams = {}
    reqParams.createOrUpdatePasscodeRequest = {}
    reqParams.createOrUpdatePasscodeRequest.clientTransactionID = reqData.clientTransactionID
    reqParams.createOrUpdatePasscodeRequest.passcodeInformation = {}
    reqParams.createOrUpdatePasscodeRequest.passcodeInformation.passcode = reqData.passcode
    reqParams.createOrUpdatePasscodeRequest.passcodeInformation.seatId = reqData.seatId
    reqParams.createOrUpdatePasscodeRequest.passcodeInformation.firstName = reqData.firstName
    reqParams.createOrUpdatePasscodeRequest.passcodeInformation.lastName = reqData.lastName
    reqParams.createOrUpdatePasscodeRequest.passcodeInformation.email = reqData.email
    reqParams.createOrUpdatePasscodeRequest.passcodeInformation.certificateProfileOid = reqData.certificateProfileOid
    reqParams.createOrUpdatePasscodeRequest.passcodeInformation.userAttribute = []

    reqData.userAttribute.forEach(function (user) {
      reqParams.createOrUpdatePasscodeRequest.passcodeInformation.userAttribute.push(user)
    })

    reqParams.createOrUpdatePasscodeRequest.version = reqData.version

    if (reqData.passcode) {
      reqParams.createOrUpdatePasscodeRequest.passcode = reqData.passcode // optional param
    }

    if (reqData.numberOfBadAttempts) {
      reqParams.createOrUpdatePasscodeRequest.numberOfBadAttempts = reqData.numberOfBadAttempts // optional param
    }

    if (reqData.passcodeStatus) {
      reqParams.createOrUpdatePasscodeRequest.passcodeStatus = reqData.passcodeStatus // optional param
    }

    if (reqData.expiryDateTime) {
      reqParams.createOrUpdatePasscodeRequest.expiryDateTime = reqData.expiryDateTime // optional param
    }

    if (reqData.creationDateTime) {
      reqParams.createOrUpdatePasscodeRequest.creationDateTime = reqData.creationDateTime // optional param
    }

    if (reqData.seatId) {
      reqParams.createOrUpdatePasscodeRequest.seatId = reqData.seatId // optional param
    }

    if (reqData.firstName) {
      reqParams.createOrUpdatePasscodeRequest.firstName = reqData.firstName // optional param
    }

    if (reqData.lastName) {
      reqParams.createOrUpdatePasscodeRequest.lastName = reqData.lastName // optional param
    }

    if (reqData.email) {
      reqParams.createOrUpdatePasscodeRequest.email = reqData.email // optional param
    }

    if (reqData.certificateProfileOid) {
      reqParams.createOrUpdatePasscodeRequest.certificateProfileOid = reqData.certificateProfileOid // optional param
    }

    if (reqData.enrollmentURL) {
      reqParams.createOrUpdatePasscodeRequest.enrollmentURL = reqData.enrollmentURL // optional param
    }

    client.createOrUpdatePasscode(reqParams, function (err, result, envelope, soapHeader) {
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while create or update passcode. Error :' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Create or update passcode successfully.')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while create or update passcode. Error :' + err)
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
userManager.createOrUpdateUser = async function (req, res) {
  const SERVICE_NAME = 'createOrUpdateUser'
  logger.info(MODULE_NAME + ' :: Entering into createOrUpdateUser()')
  let response = {}
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'usermanagement', process.env.USER_MANAGEMENT_WSDL)
    let reqParams = {}
    reqParams.createOrUpdateUserRequest = {}
    reqParams.createOrUpdateUserRequest.clientTransactionID = reqData.clientTransactionID
    reqParams.createOrUpdateUserRequest.userInformation = {}
    reqParams.createOrUpdateUserRequest.userInformation.seatId = reqData.seatId
    reqParams.createOrUpdateUserRequest.userInformation.firstName = reqData.firstName
    reqParams.createOrUpdateUserRequest.userInformation.lastName = reqData.lastName
    reqParams.createOrUpdateUserRequest.userInformation.emailAddress = reqData.emailAddress

    if (reqData.deskPhoneNumber) {
      reqParams.createOrUpdateUserRequest.userInformation.deskPhoneNumber = reqData.deskPhoneNumber // optional param
    }

    if (reqData.mobilePhoneNumber) {
      reqParams.createOrUpdateUserRequest.userInformation.mobilePhoneNumber = reqData.mobilePhoneNumber // optional param
    }

    reqParams.createOrUpdateUserRequest.userInformation.userAttribute = []
    reqData.userAttribute.forEach(function (user) {
      reqParams.createOrUpdateUserRequest.userInformation.userAttribute.push(user)
    })
    reqParams.createOrUpdateUserRequest.version = reqData.version
    client.createOrUpdateUser(reqParams, function (err, result, envelope, soapHeader) {
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while create or update user. Error :' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Create or update user successfully')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while create or update user. Error :' + err)
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
userManager.deleteUser = async function (req, res) {
  const SERVICE_NAME = 'deleteUser'
  logger.info(MODULE_NAME + ' :: Entering into deleteUser()')
  let response = {}
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'usermanagement', process.env.USER_MANAGEMENT_WSDL)
    let reqParams = {}
    reqParams.deleteUserRequest = {}
    reqParams.deleteUserRequest.clientTransactionID = reqData.clientTransactionID
    reqParams.deleteUserRequest.seatId = reqData.seatId
    reqParams.deleteUserRequest.revocationReason = reqData.revocationReason
    reqParams.deleteUserRequest.version = reqData.version
    client.deleteUser(reqParams, function (err, result, envelope, soapHeader) {
      // console.log(client.lastRequest)
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while deleting user. Error :' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: User deleted successfully')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while deleting user. Error :' + err)
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
userManager.bulkDeleteUser = async function (req, res) {
  const SERVICE_NAME = 'bulkDeleteUser'
  logger.info(MODULE_NAME + ' :: Entering into bulkDeleteUser()')
  let response = {}
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'usermanagement', process.env.USER_MANAGEMENT_WSDL)
    let reqParams = {}
    reqParams.bulkDeleteUserRequest = {}
    reqParams.bulkDeleteUserRequest.clientTransactionID = reqData.clientTransactionID
    reqParams.bulkDeleteUserRequest.seatId = []
    reqData.seatId.forEach(function (seatId) {
      reqParams.bulkDeleteUserRequest.seatId.push(seatId)
    })
    reqParams.bulkDeleteUserRequest.revocationReason = reqData.revocationReason
    reqParams.bulkDeleteUserRequest.version = reqData.version
    client.bulkDeleteUser(reqParams, function (err, result, envelope, soapHeader) {
      // console.log(client.lastRequest)
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while deleting bulk user. Error :' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: bulk user deleted successfully')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while deleting bulk user. Error :' + err)
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
userManager.getPasscodeInformation = async function (req, res) {
  const SERVICE_NAME = 'getPasscodeInformation'
  logger.info(MODULE_NAME + ' :: Entering into getPasscodeInformation()')
  let response = {}
  try {
    let [client, reqData] = await soapUtil.getSOAPClientAndReqData(req, 'usermanagement', process.env.USER_MANAGEMENT_WSDL)
    let reqParams = {}
    reqParams.getPasscodeInformationRequest = {}
    reqParams.getPasscodeInformationRequest.clientTransactionID = reqData.clientTransactionID
    reqParams.getPasscodeInformationRequest.seatId = reqData.seatId
    reqParams.getPasscodeInformationRequest.certificateProfileOid = reqData.certificateProfileOid
    reqParams.getPasscodeInformationRequest.version = reqData.version

    client.getPasscodeInformation(reqParams, function (err, result, envelope, soapHeader) {
      if (err) {
        logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while getting passcode information. Error :' + err)
        response.status = 'ERROR'
        response.errorDescription = err
        res.send(response)
      } else {
        logger.info(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Passcode information getting successfully.')
        response.status = 'SUCCESS'
        response.data = result
        res.send(response)
      }
    })
  } catch (err) {
    logger.error(MODULE_NAME + ' :: ' + SERVICE_NAME + ' :: Error while getting passcode information. Error :' + err)
    response.status = 'ERROR'
    response.errorDescription = err
    res.send(response)
  }
}

module.exports = userManager
