const { sign } = require("jsonwebtoken");
const { JWT_SECRET_KEY, JWT_EXPIRATIONTIME } = require("../../config/jwt");
/**
 * 
 * @param {*} user Object user from DB
 * @returns {string} The Json Web Token Sign
 */
const jwtUserSign = (user) => {
  return sign(user, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRATIONTIME });
};

module.exports = jwtUserSign;
