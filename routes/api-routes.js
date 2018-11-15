var express = require('express')
var router = express.Router()

// Services
var userManager = require('../service/userManager')
var policyManager = require('../service/policyManager')
var enrollmentManager = require('../service/enrollmentManager')
var certificateManager = require('../service/certificateManager')
// added base path with api, and v1(version)

/**
 * @swagger
 * /user:
 *   post:
 *     description: Retrieve the user information
 *     tags:
 *       - User
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: User's required information in json format as shown below :<br> {"clientTransactionID":"MGGL-123456","seatId":"mpki-test-user-1","version":"1.0"}
 *         in: formData
 *         required: true
 *         type: string
 *       - name: key
 *         description: The key file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: cert
 *         description: The certificate file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Retrieve the user information successful
 */
router.post('/pki/api/v1/user', userManager.getUser)

/**
 * @swagger
 * /createOrUpdatePasscode:
 *   post:
 *     description: Create or update user's passcode
 *     tags:
 *       - User
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: User's required information in json format as shown below :<br> {"clientTransactionID":"MGGL-201806140850","passcode":"123456","seatId":"Test via JSCEP 01","firstName":"Test via","lastName":"JSCEP 02","email":"manuel.gonzalezlee@digicert.com","certificateProfileOid":"2.16.840.1.113733.1.16.1.3.1.4.1.150288323","userAttribute":[{"name":"mail_firstName","value":"Test"},{"name":"mail_lastName","value":"JSCEP 02"}],"version":"1.0"}
 *         in: formData
 *         required: true
 *         type: string
 *       - name: key
 *         description: The key file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: cert
 *         description: The certificate file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Create or update user's passcode successful
 */
router.post('/pki/api/v1/createOrUpdatePasscode', userManager.createOrUpdatePasscode)

/**
 * @swagger
 * /createOrUpdateUser:
 *   post:
 *     description: Create or update user
 *     tags:
 *       - User
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: User's required information in json format as shown below :<br> {"clientTransactionID":"MGGL-20170209-1609","seatId":"absa_test_user_014","firstName":"ABSA","lastName":"Test User 14","emailAddress":"absa_testuser13@madeupcompany.com","userAttribute":[{"name":"uniqueIdentifier","value":"000000014"}],"version":"1.0"}
 *         in: formData
 *         required: true
 *         type: string
 *       - name: key
 *         description: The key file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: cert
 *         description: The certificate file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       default:
 *         description: Create or update user successful
 */
router.post('/pki/api/v1/createOrUpdateUser', userManager.createOrUpdateUser)

/**
 * @swagger
 * /policy:
 *   post:
 *     description: Get policy information
 *     tags:
 *       - Policy
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: Required information in json format as shown below :<br> {"clientTransactionID":"ManuelGon-WS-20171214-policy-1806-001","oid":"2.16.840.1.113733.1.16.1.2.3.1.1.217294600","version":"2.0"}
 *         in: formData
 *         required: true
 *         type: string
 *       - name: key
 *         description: The key file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: cert
 *         description: The certificate file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Get policy information successful
 */
router.post('/pki/api/v1/policy', policyManager.getPolicy)

/**
 * @swagger
 * /getAllPolicy:
 *   post:
 *     description: Get policy information
 *     tags:
 *       - Policy
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: Required information in json format as shown below :<br> {"clientTransactionID":"123456","version":"2.0"}
 *         in: formData
 *         required: true
 *         type: string
 *       - name: key
 *         description: The key file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: cert
 *         description: The certificate file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Get policy information successful
 */
router.post('/pki/api/v1/getAllPolicy', policyManager.getAllPolicy)

/**
 * @swagger
 * /requestSecurityToken:
 *   post:
 *     description: Get security token
 *     tags:
 *       - Certificate
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: Required information to get security token in json format as shown below :<br> {"version":"2.0","certificateProfileID":"2.16.840.1.113733.1.16.1.2.3.1.1.507542886","requestType":"http://docs.oasis-open.org/ws-sx/ws-trust/200512/Issue","binarySecurityToken":"---Certificate request content---","nameValuePair":[{"name":"seat_id","value":"mpki_test_user_3"},{"name":"otherNameUPN","value":"manuel.gonzalezlee@digicert.com"}]}
 *         in: formData
 *         required: true
 *         type: string
 *       - name: key
 *         description: The key file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: cert
 *         description: The certificate file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Get security token successful
 */
router.post('/pki/api/v1/requestSecurityToken', enrollmentManager.requestSecurityToken)

/**
 * @swagger
 * /searchCertificate:
 *   post:
 *     description: Get certificate information
 *     tags:
 *       - Certificate
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: Certificate's required information in json format as shown below :<br>{"startIndex":"0","seatId":"manuel_gonzalezlee@symantec.com","version":"1.0"}
 *         in: formData
 *         required: true
 *         type: string
 *       - name: key
 *         description: The key file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: cert
 *         description: The certificate file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Search certificate successful
 */
router.post('/pki/api/v1/searchCertificate', certificateManager.searchCertificate)

/**
 * @swagger
 * /updateCertificateStatus:
 *   post:
 *     description: Update Certificate Status
 *     tags:
 *       - Certificate
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: Certificate's required information in json format as shown below
 *         in: formData
 *         required: true
 *         type: string
 *       - name: key
 *         description: The key file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: cert
 *         description: The certificate file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       default:
 *         description: Update certificate status successful
 */
router.post('/pki/api/v1/updateCertificateStatus', certificateManager.updateCertificateStatus)

/**
 * @swagger
 * /keyRecovery:
 *   post:
 *     description: Recover key of certificate
 *     tags:
 *       - Certificate
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: Certificate's required information in json format as shown below
 *         in: formData
 *         required: true
 *         type: string
 *       - name: key
 *         description: The key file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: cert
 *         description: The certificate file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       default:
 *         description: key recovery successful
 */
router.post('/pki/api/v1/keyRecovery', certificateManager.keyRecovery)

/**
 * @swagger
 * /bulkUpdateCertificateStatus:
 *   post:
 *     description: Bulk update certificate status
 *     tags:
 *       - Certificate
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: Certificate's required information in json format as shown below
 *         in: formData
 *         required: true
 *         type: string
 *       - name: key
 *         description: The key file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: cert
 *         description: The certificate file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       default:
 *         description: Bulk update certificate status successful
 */
router.post('/pki/api/v1/bulkUpdateCertificateStatus', certificateManager.bulkUpdateCertificateStatus)

/**
 * @swagger
 * /deleteUser:
 *   post:
 *     description: Delete user
 *     tags:
 *       - User
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: User's required information in json format as shown below :<br> {"clientTransactionID":"MGGL-123456","seatId":"mpki-test-user-1","version":"1.0"}
 *         in: formData
 *         required: true
 *         type: string
 *       - name: key
 *         description: The key file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: cert
 *         description: The certificate file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       default:
 *         description: Delete user successful
 */
router.post('/pki/api/v1/deleteUser', userManager.deleteUser)

/**
 * @swagger
 * /bulkDeleteUser:
 *   post:
 *     description: Bulk delete user
 *     tags:
 *       - User
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: User's required information in json format as shown below :<br> {"clientTransactionID":"MGGL-123456","seatId":["mpki-test-user-1", "mpki_anka_test_user_1"],"version":"1.0"}
 *         in: formData
 *         required: true
 *         type: string
 *       - name: key
 *         description: The key file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: cert
 *         description: The certificate file to upload.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       default:
 *         description: Bulk delete user successful
 */
router.post('/pki/api/v1/buklDeleteUser', userManager.bulkDeleteUser)
router.post('/pki/api/v1/getPasscodeInformation', userManager.getPasscodeInformation)

// exporting the routers
module.exports = router
