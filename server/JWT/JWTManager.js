const jwt = require("jsonwebtoken");

class JWTManager {
  constructor() {
    this.secretKey = "kaszankaa3827109";
  }

  generateToken(data) {
    return jwt.sign(data, this.secretKey);
  }

  decode(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return null;
    }
  }
}

const jwtManager = new JWTManager();

module.exports = jwtManager;
