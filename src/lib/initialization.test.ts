import { describe, it } from "@jest/globals"
import assert from "node:assert";
import { initializeGameState } from "./initialization";
  
describe("Initialize game state", () => {
  const expected = [
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
  ];

  it("Creates a board of 6 rows and 7 columns with all blanks", () => {
    const actual = initializeGameState();
    assert.deepStrictEqual(actual, expected);
  });
});
