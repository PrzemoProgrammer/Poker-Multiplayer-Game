const databaseManager = require("../MongoDB/DatabaseManager");
const passwordHasher = require("../dataHasher/PasswordHasher");
const JWT = require("../JWT/JWTManager");

async function authentication(req, res) {
  const { login, password } = req.body;

  try {
    const userPassword = login + password;

    const hashedPassword = await passwordHasher.hashPassword(userPassword);

    const player = await databaseManager.findPlayer({
      passwordHash: hashedPassword,
    });

    if (!player) {
      console.log("User does not exist in database");
      return res.status(404).json({
        success: false,
        token: null,
      });
    }

    console.log("User exists in database");
    const jwt = JWT.generateToken(hashedPassword);

    return res.json({ success: true, jwt });
  } catch (error) {
    console.error("An error occurred during registration", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

module.exports = authentication;
