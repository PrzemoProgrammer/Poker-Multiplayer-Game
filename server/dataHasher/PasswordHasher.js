const crypto = require("crypto");

class PasswordHasher {
  constructor() {
    this.specialSign = "432965207bb2b7dbe29787a1f68c554ac6";
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
