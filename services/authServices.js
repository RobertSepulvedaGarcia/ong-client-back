const { getUserByEmail } = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

async function loginUser(email, password) {
  try {
    const result = await getUserByEmail(email);
    if (result) {
      const { password: dbPassword } = result;
      if (await checkPassword(password, dbPassword)) {
        return result.dataValues;
      }
    } else {
      return false;
    }
  } catch (e) {
    return { error: e };
  }
};

async function checkPassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

module.exports = loginUser;
