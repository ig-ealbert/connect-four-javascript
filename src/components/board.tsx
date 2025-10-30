"use client";

import { useState } from "react";
import DropRow from "./dropRow";
import Space from "./space";
import { initializeGameState } from "@/lib/initialization";
import { BOARD_ROWS, BOARD_COLS, rows, cols } from "@/constants";
import { isGameOver } from "@/lib/gameOver";
import { boardParams } from "@/types/boardParams";
import { getBoardValue } from "@/lib/value";

export default function Board(params: boardParams) {
  const startingGameState = initializeGameState();

  const [turn, setTurn] = useState<number>(0);
  const [boardState, setBoardState] = useState<number[][]>(startingGameState);
  const [nextFreeRow, setNextFreeRow] = useState<number[]>(
    new Array(BOARD_COLS).fill(BOARD_ROWS - 1)
  );

  function dropToken(column: number) {
    const row = nextFreeRow[column]; // Click handler does nothing if row < 0
    const newBoardState = boardState.map((row) => row.slice());
    newBoardState[row][column] = turn;
    setBoardState(newBoardState);
    const newFreeRow = nextFreeRow.slice();
    newFreeRow[column] = newFreeRow[column] - 1;
    setNextFreeRow(newFreeRow);
    const winResult = isGameOver(row, column, newBoardState, turn);
    if (!winResult.isGameOver) {
      setTurn((turn + 1) % 2);
    } else {
      params.setMessage(winResult.message);
      setNextFreeRow(new Array(BOARD_COLS).fill(-1));
    }
  }

  return (
    <table>
      <tbody>
        <DropRow
          clickHandler={dropToken}
          nextFreeRows={nextFreeRow}
          turn={turn}
        />
        {rows.map((rowNumber) => (
          <tr key={`row${rowNumber}`}>
            <td>
              <svg xmlns="http://www.w3.org/2000/svg" className="boardRow">
                {cols.map((colNumber) => (
                  <Space
                    key={`spaceRow${rowNumber}Col${colNumber}`}
                    x={55 + 110 * colNumber}
                    column={colNumber}
                    hoverOn={() => null}
                    hoverOff={() => null}
                    onClick={() => null}
                    value={getBoardValue(boardState, rowNumber, colNumber)}
                  />
                ))}
              </svg>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
