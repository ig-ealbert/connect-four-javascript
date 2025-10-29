export function getBoardValue(
  boardState: number[][],
  row: number,
  column: number
) {
  if (boardState && boardState[row]) {
    return boardState[row][column];
  }
  return 2;
}
