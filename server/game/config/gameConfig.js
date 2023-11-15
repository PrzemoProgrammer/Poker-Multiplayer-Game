const MAX_PLAYERS = 5;
const MAX_PLAYER_CARDS = 2;
const SIT_POSITIONS = [1, 2, 3, 4, 5];
const DEFAULT_PLAYER_GAME_POSITION = "player";
const DEFAULT_PLAYER_BET_COUNT = 0;
const GAME_POSITIONS = ["dealer", "smallBlind", "bigBlind", "player"];
const GAME_ROUND_NAMES = ["Lobby", "Preflop", "Flop", "Turn", "River"];
const BUTTON_TYPES = ["fold", "check", "call", "raise", "bet"];
const SMALL_BLIND_BET = 1000;
const BIG_BLIND_BET = 2 * SMALL_BLIND_BET;
const PLAYER_TURN_DURATION = 15;

module.exports = {
  MAX_PLAYERS,
  SIT_POSITIONS,
  GAME_POSITIONS,
  SMALL_BLIND_BET,
  BIG_BLIND_BET,
  MAX_PLAYER_CARDS,
  DEFAULT_PLAYER_GAME_POSITION,
  DEFAULT_PLAYER_BET_COUNT,
  PLAYER_TURN_DURATION,
  GAME_ROUND_NAMES,
  BUTTON_TYPES,
};
