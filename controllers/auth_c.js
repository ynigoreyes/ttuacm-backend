const jwt = require('jsonwebtoken');
const querystring = require('querystring');

exports.google = (req, res) => {
  const token = jwt.sign({ data: req.user }, process.env.session_secret, {
    expiresIn: 604800, // 1 week
  });

  const qs = querystring.stringify({
    token: `JWT ${token}`
  });

  res.redirect(`http://localhost:4200/?${qs}`);
};