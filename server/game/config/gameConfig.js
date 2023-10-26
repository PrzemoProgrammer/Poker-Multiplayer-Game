const MAX_PLAYERS = 5;
const SIT_POSITIONS = [1, 2, 3, 4, 5];
const GAME_POSITIONS = ["dealer", "smallBlind", "bigBlind", "player"];
const SMALL_BLIND_BET = 1000;
const BIG_BLIND_BET = 2 * SMALL_BLIND_BET;

module.exports = {
  MAX_PLAYERS,
  SIT_POSITIONS,
  GAME_POSITIONS,
  SMALL_BLIND_BET,
  BIG_BLIND_BET,
};
