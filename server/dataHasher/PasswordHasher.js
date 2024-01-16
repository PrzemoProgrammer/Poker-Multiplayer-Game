const crypto = require("crypto");
const { SPECIAL_SIGN } = require("./config");

class PasswordHasher {
  constructor() {
    this.specialSign = SPECIAL_SIGN;
  }

  hashPassword(password) {
    const hash = crypto
      .createHash("sha256")
      .update(password + this.specialSign)
      .digest("hex");
    return hash;
  }
}

const passwordHasher = new PasswordHasher();

module.exports = passwordHasher;
//TODO: Make static
