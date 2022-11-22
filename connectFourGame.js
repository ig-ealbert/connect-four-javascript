let turn = 0; // 0 = black, 1 = white
let gameState = initializeGameState();

function initializeGameState() {
  const row = [2, 2, 2, 2, 2, 2, 2]; // 0 = black, 1 = white, 2 = blank
  const board = [];
  for (let i = 0; i < 6; i++) {
    board.push(row.slice());
  }
  return board;
}

function dropToken(column) {
  const row = getNextBlankSpace(column);
  if (row === 0) {
    disableFullColumn(column);
  }
  gameState[row][column] = turn;
  colorSpace(getSpace(row, column), getTurnColor());
  if (!isGameOver(row, column)) {
    turn = (turn + 1) % 2;
  }
}

function getNextBlankSpace(column) {
  let row = 5;
  let spaceValue = gameState[row][column];
  while (spaceValue !== 2) {
    row--;
    spaceValue = gameState[row][column];
  }
  return row;
}

function colorSpace(space, color) {
  space.style.fill = color;
}

function getTurnColor() {
  return turn === 0 ? "black" : "white";
}

function getSpace(row, column) {
  const rowTd = document.getElementById(`row${row + 1}`);
  return rowTd.childNodes[2 * column + 1];
}

function isGameOver(row, column) {
  let gameOver = detectWin(row, column);
  if (gameOver) {
    endGame(getTurnColor() + " wins!");
  }
  else if (detectTie()) {
    endGame("The game is a tie.");
    gameOver = true;
  }
  return gameOver;
}

function detectWin(row, column) {
  return winHorizontally(row) || winVertically(column) || winDiagonally(row, column);
}

function winHorizontally(row) {
  const colors = [];
  for (let i = 0; i < 7; i++) {
    colors.push(gameState[row][i]);
  }
  return matchFour(colors);
}

function winVertically(column) {
  const colors = [];
  for (let i = 0; i < 6; i++) {
    colors.push(gameState[i][column]);
  }
  return matchFour(colors);
}

function winDiagonally(row, column) {
  return winDiagonalLeft(row, column) || winDiagonalRight(row, column);
}

function winDiagonalLeft(row, column) {
  let colors = getColorsUpLeft(row, column);
  colors = colors.concat(getColorsDownRight(row + 1, column + 1));
  return matchFour(colors);
}

function winDiagonalRight(row, column) {
  let colors = getColorsDownLeft(row, column);
  colors = colors.concat(getColorsUpRight(row - 1, column + 1));
  return matchFour(colors);
}

function getColorsUpLeft(row, column) {
  const colors = [];
  while (row >= 0 && column >= 0) {
    colors.unshift(gameState[row][column]);
    row--;
    column--;
  }
  return colors;
}

function getColorsDownRight(row, column) {
  const colors = [];
  while (row < 6 && column < 7) {
    colors.push(gameState[row][column]);
    row++;
    column++;
  }
  return colors;
}

function getColorsDownLeft(row, column) {
  const colors = [];
  while (row < 6 && column >= 0) {
    colors.unshift(gameState[row][column]);
    row++;
    column--;
  }
  return colors;
}

function getColorsUpRight(row, column) {
  colors = [];
  while (row >= 0 && column < 7) {
    colors.push(gameState[row][column]);
    row--;
    column++;
  }
  return colors;
}

function matchFour(colors) {
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

function disableFullColumn(column) {
  const dropRow = document.getElementById("dropRow");
  const space = dropRow.childNodes[2 * column + 1];
  colorSpace(space, "gray");
  space.removeAttribute("onclick");
  space.removeAttribute("onmouseover");
  space.removeAttribute("onmouseleave");
}

function endGame(result) {
  disableAllColumns();
  const message = document.getElementById("message");
  message.innerHTML = result;
  const resetButton = document.getElementById("restartGame");
  resetButton.classList.add("greenBorder");
}

function disableAllColumns() {
  for (let i = 0; i < 7; i++) {
    disableFullColumn(i);
  }
}

function detectTie() {
  // Wins have already been detected, so if the board is full, it's a tie
  for (let i = 0; i < 6; i++) {
    if (gameState[i].indexOf(2) !== -1) {
      return false;
    }
  }
  return true;
}
