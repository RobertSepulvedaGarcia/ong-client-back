const sgMail = require("@sendgrid/mail");
const {
  SENDGRID_API_KEY,
  SENDGRID_VERIFIED_SENDER,
} = require("../config/sendgrid");
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = (emailAddressTo, subject, body) => {
  const msg = {
    to: emailAddressTo,
    from: SENDGRID_VERIFIED_SENDER,
    subject: subject,
    html: body,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent to:", msg.to); //TODO: Handle OK
    })
    .catch((error) => {
      console.error("Email error:", error); //TODO: Handle Error
    });
};

module.exports = {
  sendMail,
};
