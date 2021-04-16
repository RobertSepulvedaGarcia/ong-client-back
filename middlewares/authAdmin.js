const getRoleById = require("../repositories/roleRepository");
const createError = require('http-errors');



async function authAdmin(req, res, next) {
  try {
    //If the roleId is sended in the headers, make a request to the DB to see if is a Admin, 
    //if not, throw error.
    let { roleId } = req.user;

    if (roleId) {
      const result = await getRoleById(roleId)
      if (result) {
        const { name } = result;

        if (name === "Admin") {
          console.log("Access granted.")
          next();
        } else {
          next(createError(403, "User is not an Admin"))
        }
      }
    } else {
      next(createError(404, "Role id doesnt exist"))
    }

  } catch (error) {
    next(error)
  }
}

module.exports = authAdmin;
