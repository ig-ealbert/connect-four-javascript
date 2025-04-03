import { describe, it } from "@jest/globals"
import assert from "node:assert";
import { isGameOver } from "./gameOver";
  
describe("Detect end game", () => {
  const tie = [
    [0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
  ];

  const horizontalWinBlack = [
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 2, 2, 2, 2],
    [0, 0, 0, 0, 2, 2, 2],
  ];

  const horizontalWinWhite = [
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 2, 2, 2, 2],
    [1, 1, 1, 1, 0, 2, 2],
  ];

  const verticalWinBlack = [
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [0, 2, 2, 2, 2, 2, 2],
    [0, 1, 2, 2, 2, 2, 2],
    [0, 1, 2, 2, 2, 2, 2],
    [0, 1, 2, 2, 2, 2, 2],
  ];

  const verticalWinWhite = [
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [1, 2, 2, 2, 2, 2, 2],
    [1, 2, 2, 2, 2, 2, 2],
    [1, 0, 0, 2, 2, 2, 2],
    [1, 0, 0, 2, 2, 2, 2],
  ];

  const diagonalUpRightWinBlack = [
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 0, 2, 2, 2],
    [1, 1, 0, 0, 2, 2, 2],
    [1, 0, 1, 0, 2, 2, 2],
    [0, 1, 1, 1, 0, 0, 2],
  ];

  const diagonalUpRightWinWhite = [
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 1, 2, 2, 2],
    [1, 2, 1, 0, 2, 2, 2],
    [0, 1, 0, 0, 1, 2, 2],
    [1, 0, 0, 0, 1, 2, 2],
  ];

  const diagonalUpLeftWinBlack = [
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 0, 2, 2, 2],
    [2, 2, 1, 0, 0, 2, 2],
    [2, 2, 1, 0, 1, 0, 2],
    [2, 2, 0, 1, 1, 1, 0],
  ];

  const diagonalUpLeftWinWhite = [
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 1, 2, 2, 2],
    [2, 2, 0, 1, 1, 2, 2],
    [2, 2, 0, 0, 1, 1, 2],
    [2, 0, 1, 0, 0, 0, 1],
  ];
  
  const noWinMovesLeft = [
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 2, 2, 2, 2],
    [0, 0, 0, 2, 2, 2, 2],
  ];
   
  it("Finds a tie", () => {
    const outcome = isGameOver(0, 0, tie, 0);
    assert.deepStrictEqual(outcome, {
      isGameOver: true,
      message: "The game is a tie!",
    });
  });

  it("Finds a horizontal black win", () => {
    const outcome = isGameOver(5, 3, horizontalWinBlack, 0);
    assert.deepStrictEqual(outcome, {
      isGameOver: true,
      message: "Black wins!",
    });
  });

  it("Finds a horizontal white win", () => {
    const outcome = isGameOver(5, 3, horizontalWinWhite, 1);
    assert.deepStrictEqual(outcome, {
      isGameOver: true,
      message: "White wins!",
    });
  });

  it("Finds a vertical black win", () => {
    const outcome = isGameOver(2, 0, verticalWinBlack, 0);
    assert.deepStrictEqual(outcome, {
      isGameOver: true,
      message: "Black wins!",
    });
  });

  it("Finds a vertical white win", () => {
    const outcome = isGameOver(2, 0, verticalWinWhite, 1);
    assert.deepStrictEqual(outcome, {
      isGameOver: true,
      message: "White wins!",
    });
  });

  it("Finds a diagonal up right black win", () => {
    const outcome = isGameOver(2, 3, diagonalUpRightWinBlack, 0);
    assert.deepStrictEqual(outcome, {
      isGameOver: true,
      message: "Black wins!",
    });
  });

  it("Finds a diagonal up right white win", () => {
    const outcome = isGameOver(2, 3, diagonalUpRightWinWhite, 1);
    assert.deepStrictEqual(outcome, {
      isGameOver: true,
      message: "White wins!",
    });
  });

  it("Finds a diagonal up left black win", () => {
    const outcome = isGameOver(2, 3, diagonalUpLeftWinBlack, 0);
    assert.deepStrictEqual(outcome, {
      isGameOver: true,
      message: "Black wins!",
    });
  });

  it("Finds a diagonal up left white win", () => {
    const outcome = isGameOver(2, 3, diagonalUpLeftWinWhite, 1);
    assert.deepStrictEqual(outcome, {
      isGameOver: true,
      message: "White wins!",
    });
  });

  it("Does not find a win", () => {
    const outcome = isGameOver(4, 2, noWinMovesLeft, 1);
    assert.deepStrictEqual(outcome, {
      isGameOver: false,
      message: "Keep going!",
    });
  });
});
