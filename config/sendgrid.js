require('dotenv').config()
module.exports = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_VERIFIED_SENDER: process.env.SENDGRID_VERIFIED_SENDER,
};
