var express = require('express');
var router = express.Router();
/* Function of BD */
const user = require('../controllers/User.js')

/* Modules */
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const { getAllUsers } = require('../repositories/userRepository');
const authMiddleware = require('../middlewares/auth');
const authAdminMiddleware = require('../middlewares/authAdmin');

/* POST register user */
router.post('/auth/register', body('email').isEmail(), body('password').isLength({ min: 6 }), function(req, res, next){
  const errors = validationResult(req);
  validate(errors)
  /* Encrypt password for send to BD */
  /* we are driver like a promise, in the finish the encrypt call to create and change the pass for the passhash*/
  hashPassword(req.body.password)
  .then(r => user.create(req.body, req.body.password = r, res))
  .then(r => res.send(r))
  .catch(next)

})
/* Function async hash */
async function hashPassword(password){
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash
}

/* Function validate  */
function validate (errors){
  if (!errors.isEmpty()) {
    if(errors.errors.param == 'email'){
      return res.status(400).send('Email invalido');
    }
    if(errors.errors.param === 'password'){
      return res.status(400).send('Password invalido');
    }
    return res.status(400).json({ errors: errors.array() });
  }
}

router.get('/', authMiddleware, authAdminMiddleware, async (req, res, next) => {
  const userList = await getAllUsers();
  return res.status(200).json(userList);
});

module.exports = router;

/* to login we are use the function compare, I get a example to future login */
/* 
  The hash come to BD 
  bcrypt.compare(password, passwordHasdeado, (err, coinciden) => {
	  if (err) {
	  	console.log("Error comprobando:", err);
  	} else {
		  console.log("¿La contraseña coincide?: " + coinciden);
	  }
  });
*/