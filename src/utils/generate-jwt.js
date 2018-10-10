const jwt = require('jsonwebtoken')
const functions = require('firebase-functions')

/**
 * Generates a JWT
 *
 * @param {object} payload all the data that will be stored into the token
 */
module.exports.generateJWTToken = (payload) => {
  const token = jwt.sign({ data: payload },
    functions.config().auth.session_secret, {
      expiresIn: 604800, // 1 week
    });

  return token !== '' ? token : new Error('Empty JWT Payload')
}
