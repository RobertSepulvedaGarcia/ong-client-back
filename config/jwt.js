module.exports = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "jwt-secret-key",
  JWT_EXPIRATIONTIME: process.env.JWT_EXPIRATIONTIME || "24h"
}