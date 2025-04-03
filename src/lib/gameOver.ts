function detectTie(gameState: number[][]) {
  // Wins have already been detected, so if the board is full, it's a tie
  for (const row of gameState) {
    if (row.indexOf(2) !== -1) {
      return false;
    }
  }
  return true;
}

function matchFour(colors: number[]) {
  for (let i = 0; i < 4; i++) {
    if (i + 3 >= colors.length) {
      return false;
    }
    const colorSet = new Set(colors.slice(i, i + 4));
    if (colorSet.size === 1 && !colorSet.has(2)) {
      return true;
    };
  }
  return false;
}

function getColorsUpLeft(row: number, column: number, gameState: number[][]) {
  const colors = [];
  while (row >= 0 && column >= 0) {
    colors.unshift(gameState[row][column]);
    row--;
    column--;
  }
  return colors;
}

function getColorsDownRight(row: number, column: number, gameState: number[][]) {
  const colors = [];
  while (row < 6 && column < 7) {
    colors.push(gameState[row][column]);
    row++;
    column++;
  }
  return colors;
}

function getColorsDownLeft(row: number, column: number, gameState: number[][]) {
  const colors = [];
  while (row < 6 && column >= 0) {
    colors.unshift(gameState[row][column]);
    row++;
    column--;
  }
  return colors;
}

function getColorsUpRight(row: number, column: number, gameState: number[][]) {
  const colors = [];
  while (row >= 0 && column < 7) {
    colors.push(gameState[row][column]);
    row--;
    column++;
  }
  return colors;
}

function detectWin(row: number, column: number, gameState: number[][]) {
  return winHorizontally(row, gameState) ||
         winVertically(column, gameState) ||
         winDiagonally(row, column, gameState);
}

function winHorizontally(row: number, gameState: number[][]) {
  const colors = gameState[row];
  return matchFour(colors);
}

function winVertically(column: number, gameState: number[][]) {
  const colors = gameState.map((row) => row[column]);
  return matchFour(colors);
}

function winDiagonally(row: number, column: number, gameState: number[][]) {
  return winDiagonalLeft(row, column, gameState) ||
         winDiagonalRight(row, column, gameState);
}

function winDiagonalLeft(row: number, column: number, gameState: number[][]) {
  let colors = getColorsUpLeft(row, column, gameState);
  colors = colors.concat(getColorsDownRight(row + 1, column + 1, gameState));
  return matchFour(colors);
}

function winDiagonalRight(row: number, column: number, gameState: number[][]) {
  let colors = getColorsDownLeft(row, column, gameState);
  colors = colors.concat(getColorsUpRight(row - 1, column + 1, gameState));
  return matchFour(colors);
}

function getTurnColor(turn: number) {
  return turn === 0 ? "black" : "white";
}

export function isGameOver(row: number, column: number, gameState: number[][], turn: number) {
  const gameOver = detectWin(row, column, gameState);
  if (gameOver) {
    return {
      isGameOver: true,
      message: `${getTurnColor(turn)} wins!`
    };
  }
  else if (detectTie(gameState)) {
    return {
      isGameOver: true,
      message: "The game is a tie!"
    };
  }
  return {
    isGameOver: false,
    message: "Keep going!"
  };
}
