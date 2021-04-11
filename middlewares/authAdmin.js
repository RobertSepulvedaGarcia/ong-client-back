const getRoleById = require("../middlewares/authAdmin");

async function authAdmin(req, res, next) {
 try {
     //If the roleId is sended in the headers, make a request to the DB to see if is a Admin, 
     //if not, throw error.
    let { roleId } = req.headers;
  
   if(roleId){
    const result = await getRoleById(roleId)
    
    if (result) {
      const { name } = result;
      
      if(name==="Admin"){
        console.log("Access granted.")
        next();
      }
    } else {
      throw "User is not a Admin";
    }
   }else{
    throw "RoleId doesn't exist";
   }
     
 } catch (error) {
     console.log(error)
 }
}

module.exports = authAdmin;
