const databaseManager = require("../MongoDB/DatabaseManager");
const JWT = require("../JWT/JWTManager");

async function playerState(req, res) {
  const { authToken } = req.body;

  try {
    const hashedPassword = JWT.decode(authToken);

    const userDatabaseData = await databaseManager.findPlayer({
      passwordHash: hashedPassword,
    });

    delete userDatabaseData.passwordHash;

    console.log(userDatabaseData);

    //obsłuzyć błąd jeśli token będzie zły
    // if (player) {
    //   return res.status(404).json({
    //     success: false,
    //   });
    // }

    return res.json(userDatabaseData);
  } catch (error) {
    console.error("An error occurred during registration", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

module.exports = playerState;
