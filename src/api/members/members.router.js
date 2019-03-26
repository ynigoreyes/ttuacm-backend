const express = require('express')
const ErrorMessages = require('./members.errors.js')

const Controller = require('./members.controller')

const router = express.Router()

/**
 * @api {get} /api/v2/members/test Test Route
 * @apiDescription
 * Test route to check if the API is properly connected
 *
 * @apiGroup Members
 * @apiVersion 0.2.0
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 */
router.get('/test', (req, res) => {
  res.send('Members App Works!')
})

/**
 * @api {get} /api/v2/members Get Members
 * @apiDescription
 * Gets all of the members in database
 *
 * @apiVersion 0.2.0
 *
 * @apiGroup Members
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     members : [
 *        "email": String,
 *        "hasPaidDues": Boolean,
 *        "groups": String[]
 *     ]
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 err.code OK
 */
router.get('/', async (req, res) => {
  try {
    const members = await new Controller().getMembers()
    res.status(201).json({ members })
  } catch (err) {
    console.error(err)
    res.status(err.code || 500).json({ err })
  }
})

/**
 * @api {post} /api/v2/members Create Member
 * @apiDescription
 * Creates a member in the database
 *
 * @apiVersion 0.2.0
 *
 * @apiGroup Members
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     member : {
 *        "email": String,
 *        "hasPaidDues": Boolean,
 *        "groups": String[]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 err.code OK
 *
 * @apiParam (Request body) {String} email email
 */
router.post('/', async (req, res) => {
  try {
    if (!req.body.email) throw ErrorMessages.MissingRequestBody()
    const newMember = await new Controller().createMember(req.body.email)
    res.status(201).json({ member: newMember })
  } catch (err) {
    console.error(err)
    res.status(err.code || 500).json({ err })
  }
})

/**
 * @api {delete} /api/v2/members Subscribe to a group
 * @apiDescription
 * Subscribes a member to a group
 *
 * @apiVersion 0.2.0
 *
 * @apiGroup Members
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     member : {
 *        "email": String,
 *        "hasPaidDues": Boolean,
 *        "groups": String[]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 err.code OK
 *
 * @apiParam (Request body) {String} email email
 * @apiParam (Request body) {String[]} groups groups
 */
router.put('/subscribe', async (req, res) => {
  try {
    if (!req.body.email || !req.body.groups)
      throw ErrorMessages.MissingRequestBody()
    if (!Array.isArray(req.body.groups)) throw ErrorMessages.BadInput()

    const updatedMember = await new Controller().subscribe(
      req.body.email,
      req.body.groups,
    )
    res.status(202).json({ member: updatedMember })
  } catch (err) {
    console.error(err)
    res.status(err.code || 500).json({ err })
  }
})

/**
 * @api {put} /api/v2/members Unsubscribe to a group
 * @apiDescription
 * Unsubscribes a member to a group
 *
 * @apiVersion 0.2.0
 *
 * @apiGroup Members
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     member : {
 *        "email": String,
 *        "hasPaidDues": Boolean,
 *        "groups": String[]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 err.code OK
 *
 * @apiParam (Request body) {String} email email
 * @apiParam (Request body) {String[]} groups groups
 */
router.put('/unsubscribe', async (req, res) => {
  try {
    if (!req.body.email || !req.body.groups)
      throw ErrorMessages.MissingRequestBody()
    if (!Array.isArray(req.body.groups)) throw ErrorMessages.BadInput()

    const updatedMember = await new Controller().unsubscribe(
      req.body.email,
      req.body.groups,
    )
    res.status(202).json({ member: updatedMember })
  } catch (err) {
    res.status(err.code || 500).json({ err })
  }
})

/**
 * @api {patch} /api/v2/members Pay Dues
 * @apiDescription
 * Allows a user to pay dues given an email
 *
 * @apiVersion 0.2.0
 *
 * @apiGroup Members
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     member : {
 *        "email": String,
 *        "hasPaidDues": Boolean,
 *        "groups": String[]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 err.code OK
 *
 * @apiParam (Request body) {String} email email
 */
router.patch('/dues', async (req, res) => {
  try {
    if (!req.body.email) throw ErrorMessages.MissingRequestBody()

    const updatedMember = await new Controller().payDues(req.body.email)
    res.status(202).json({ member: updatedMember })
  } catch (err) {
    console.error(err)
    res.status(err.code || 500).json({ err })
  }
})

/**
 * @api {post} /api/v2/members Resets Groups and HasPaidDues
 * @apiDescription
 * This resets the groups and hasPaidDues fields in the database.
 * This should be run every beginning of each semester.
 *
 * @apiVersion 0.2.0
 *
 * @apiGroup Members
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     results: {
 *         "modified": Number,
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 err.code OK
 */
router.post('/reset', async (req, res) => {
  try {
    const results = await new Controller().reset()
    res.status(200).json({ results: { modified: results.nModified } })
  } catch (err) {
    console.error(err)
    res.status(err.code || 500).json({ err })
  }
})

module.exports = router