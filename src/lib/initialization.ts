/*
Game State Values
0 = black
1 = white
2 = blank
*/

import { BOARD_COLS, BOARD_ROWS } from "@/constants";

export function initializeGameState() {
  const row = new Array(BOARD_COLS).fill(2);
  const board = new Array(BOARD_ROWS).fill(row);
  return board;
}
