const jwt = require("jsonwebtoken");

module.exports = class JWTManager {
  static secretKey = "kaszankaa3827109";

  static generateToken(data) {
    return jwt.sign(data, this.secretKey);
  }

  static decode(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return null;
    }
  }
};
