const databaseManager = require("../MongoDB/DatabaseManager");
const passwordHasher = require("../dataHasher/PasswordHasher");

async function register(req, res) {
  const { login, password, nick } = req.body;

  try {
    const userPassword = login + password;

    const hashedPassword = await passwordHasher.hashPassword(userPassword);

    const player = await databaseManager.findPlayer({
      passwordHash: hashedPassword,
    });

    if (player) {
      console.log("User password hash exists in database");
      return res.status(404).json({
        success: false,
      });
    }

    console.log("User password hash  does not exist in database");
    const userData = {
      nick: nick,
      money: 0,
      passwordHash: hashedPassword,
    };

    databaseManager.createUser(userData);

    return res.json({ success: true });
  } catch (error) {
    console.error("An error occurred during registration", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

module.exports = register;
