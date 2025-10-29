import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { getBoardValue } from "./value";
import { initializeGameState } from "./initialization";

describe("Board value", () => {
  it("Gets empty space", () => {
    const board = initializeGameState();
    const actual = getBoardValue(board, 0, 0);
    assert.strictEqual(actual, 2);
  });

  it("Gets white space", () => {
    const board = initializeGameState();
    board[0][0] = 1;
    const actual = getBoardValue(board, 0, 0);
    assert.strictEqual(actual, 1);
  });

  it("Gets black space", () => {
    const board = initializeGameState();
    board[0][0] = 0;
    const actual = getBoardValue(board, 0, 0);
    assert.strictEqual(actual, 0);
  });

  it("Gets blank value for non-existant space", () => {
    const board: number[][] = [];
    const actual = getBoardValue(board, 0, 0);
    assert.strictEqual(actual, 2);
  });
});
