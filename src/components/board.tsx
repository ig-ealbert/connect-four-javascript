'use client'

import { useState } from "react";
import DropRow from "./dropRow"
import Space from "./space";
import { initializeGameState } from "@/lib/initialization";
import { BOARD_ROWS, BOARD_COLS } from "@/constants";
import { isGameOver } from "@/lib/gameOver";
import { boardParams } from "@/types/boardParams";

export default function Board(params: boardParams) {
  const rows = [0, 1, 2, 3, 4, 5];
  const startingGameState = initializeGameState();

  const [turn, setTurn] = useState<number>(0);
  const [boardState, setBoardState] = useState<number[][]>(startingGameState);
  const [nextFreeRow, setNextFreeRow] = useState<number[]>(new Array(BOARD_COLS).fill(BOARD_ROWS - 1));

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
    }
    else {
      params.setMessage(winResult.message);
      setNextFreeRow(new Array(BOARD_COLS).fill(-1));
    }
  }

  function getBoardValue(row: number, column: number) {
    if (boardState && boardState[row]) {
      return boardState[row][column];
    }
    return 2;
  }

  return (
  <table>
    <tbody>
      <DropRow clickHandler={dropToken} nextFreeRows={nextFreeRow} turn={turn} />
      {rows.map((rowNumber) => (
      <tr key={`row${rowNumber}`}>
        <td>
        <svg xmlns="http://www.w3.org/2000/svg" className="boardRow">
          <Space x={55} column={0} 
            onClick={() => null} value={getBoardValue(rowNumber, 0)} />
          <Space x={165} column={1}
            onClick={() => null} value={getBoardValue(rowNumber, 1)} />
          <Space x={275} column={2}
            onClick={() => null} value={getBoardValue(rowNumber, 2)} />
          <Space x={385} column={3}
            onClick={() => null} value={getBoardValue(rowNumber, 3)} />
          <Space x={495} column={4}
            onClick={() => null} value={getBoardValue(rowNumber, 4)} />
          <Space x={605} column={5}
            onClick={() => null} value={getBoardValue(rowNumber, 5)} />
          <Space x={715} column={6}
            onClick={() => null} value={getBoardValue(rowNumber, 6)} />
        </svg>
        </td>
      </tr>
    ))}
    </tbody>
	</table>
  )
}