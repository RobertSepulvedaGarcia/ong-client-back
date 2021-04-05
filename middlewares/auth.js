const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../config/jwt");
/**
 * Auth token middleware. Validate the submitted token in req.header
 * express Router-level middleware
 * If token is valid, user information is added in req.user and the request continues.
 * Otherwise, it throws an error and the request does not continue.
 */
function validateToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) {
    let err = new Error("Token must be send.");
    err.status = 400;
    throw err;
  }
  jwt.verify(token, JWT_SECRET_KEY, function (err, decodedToken) {
    if (err) {
      let err = new Error("Invalid token.");
      err.status = 401;
      throw err;
    }
    req.user = decodedToken;
    console.log(decodedToken)
    next();
  });
}
module.exports = validateToken;
