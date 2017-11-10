var turn = 0; // 0 = black, 1 = white
var gameState = initializeGameState();

function initializeGameState() {
	var row = [2, 2, 2, 2, 2, 2, 2]; // 0 = black, 1 = white, 2 = blank
	var board = [];
	for (var i = 0; i < 6; i++) {
		board.push(row.slice());
	}
	return board;
}

function dropToken(column) {
	var row = getNextBlankSpace(column);
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
	var row = 5;
	var spaceValue = gameState[row][column];
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
	var rowTd = document.getElementById("row" + (row + 1));
	return rowTd.childNodes[2 * column + 1];
}

function isGameOver(row, column) {
	var gameOver = winHorizontally(row) || winVertically(column) || winDiagonally(row, column);
	if (gameOver) {
		endGame(getTurnColor() + " wins!");
	}
	else if (detectTie()) {
		endGame("The game is a tie.");
		gameOver = true;
	}
	return gameOver;
}

function winHorizontally(row) {
	var colors = [];
	for (var i = 0; i < 7; i++) {
		colors.push(gameState[row][i]);
	}
	return matchFour(colors);
}

function winVertically(column) {
	var colors = [];
	for (var i = 0; i < 6; i++) {
		colors.push(gameState[i][column]);
	}
	return matchFour(colors);
}

function winDiagonally(row, column) {
	return winDiagonalLeft(row, column) || winDiagonalRight(row, column);
}

function winDiagonalLeft(row, column) {
	var colors = getColorsUpLeft(row, column, []);
	colors = getColorsDownRight(row + 1, column + 1, colors);
	return checkDiagonalForWin(colors);
}

function winDiagonalRight(row, column) {
	var colors = getColorsDownLeft(row, column, []);
	colors = getColorsUpRight(row - 1, column + 1, colors);
	return checkDiagonalForWin(colors);
}

function checkDiagonalForWin(colors) {
	for (var i = 4; i <= colors.length; i++) {
		if (matchFour(colors.slice(i - 4, i))) {
			return true;
		}
	}
	return false;
}

function getColorsUpLeft(row, column, colors) {
	while (row >= 0 && column >= 0) {
		colors.unshift(gameState[row][column]);
		row--;
		column--;
	}
	return colors;
}

function getColorsDownRight(row, column, colors) {
	while (row < 6 && column < 7) {
		colors.push(gameState[row][column]);
		row++;
		column++;
	}
	return colors;
}

function getColorsDownLeft(row, column, colors) {
	while (row < 6 && column >= 0) {
		colors.unshift(gameState[row][column]);
		row++;
		column--;
	}
	return colors;
}

function getColorsUpRight(row, column, colors) {
	while (row >= 0 && column < 7) {
		colors.push(gameState[row][column]);
		row--;
		column++;
	}
	return colors;
}

function matchFour(colors) {
	for (var i = 0; i < 4; i++) {
		if (colors[i] != 2 &&
			colors[i] === colors[i + 1] &&
			colors[i] === colors[i + 2] &&
			colors[i] === colors[i + 3]) {
				return true;
			}
	}
	return false;
}

function disableFullColumn(column) {
	var dropRow = document.getElementById("dropRow");
	var space = dropRow.childNodes[2 * column + 1];
	colorSpace(space, "gray");
	space.removeAttribute("onclick");
	space.removeAttribute("onmouseover");
	space.removeAttribute("onmouseleave");
}

function endGame(result) {
	disableAllColumns();
	var message = document.getElementById("message");
	message.innerHTML = result;
	var resetButton = document.getElementById("restartGame");
	resetButton.classList.add("greenBorder");
}

function disableAllColumns() {
	for (var i = 0; i < 7; i++) {
		disableFullColumn(i);
	}
}

function detectTie() {
	// Wins have already been detected, so if the board is full, it's a tie
	for (var i = 0; i < 6; i++) {
		if (gameState[i].indexOf(2) !== -1) {
			return false;
		}
	}
	return true;
}
