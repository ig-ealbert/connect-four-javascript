QUnit.test( "Initially the message div should be blank", function (assert ) {
  assert.equal( message.innerHTML, "", "No message should be displayed when the game starts." );
});

QUnit.test( "The reset button should not be highlighted when the game starts", function (assert ) {
  var resetButton = document.getElementById("restartGame");
  assert.equal( resetButton.classList.contains("greenBorder"), false, "The reset button should not have a green border." );
});

QUnit.test( "The game state should be blank when the game starts", function (assert ) {
  gameState = initializeGameState();
  var expected = [[2, 2, 2, 2, 2, 2, 2],
				  [2, 2, 2, 2, 2, 2, 2],
			      [2, 2, 2, 2, 2, 2, 2],
			      [2, 2, 2, 2, 2, 2, 2],
			      [2, 2, 2, 2, 2, 2, 2],
			      [2, 2, 2, 2, 2, 2, 2]];
  assert.deepEqual( gameState, expected, "The game state should be blank." );
});

QUnit.test( "After dropping a black token, the next token is white", function( assert ) {
  turn = 0;
  dropToken(1);
  assert.equal( turn, 1, "The turn changes from black to white." );
});

QUnit.test( "After dropping a white token, the next token is black", function( assert ) {
  turn = 0;
  dropToken(1);
  dropToken(1);
  assert.equal( turn, 0, "The turn changes from white to black." );
});

QUnit.test( "After dropping a black token, the black token is shown on the board", function( assert ) {
  turn = 0;
  var nextBlank = getNextBlankSpace(0);
  var space = getSpace(nextBlank, 0);
  dropToken(0);
  assert.equal( space.style.fill, "black", "The black token is visible." );
});

QUnit.test( "After dropping a white token, the white token is shown on the board", function( assert ) {
  turn = 1;
  var nextBlank = getNextBlankSpace(0);
  var space = getSpace(nextBlank, 0);
  dropToken(0);
  assert.equal( space.style.fill, "white", "The white token is visible." );
});

QUnit.test( "The next blank space should be in row index 5 when the board is blank", function (assert ) {
  gameState = initializeGameState();
  var nextBlank = getNextBlankSpace(0);
  assert.deepEqual( nextBlank, 5, "The row with index 5 should be blank." );
});

QUnit.test( "The next blank space should be in row index 4 when a token is dropped on 1 other", function (assert ) {
  gameState = initializeGameState();
  dropToken(0);
  var nextBlank = getNextBlankSpace(0);
  assert.deepEqual( nextBlank, 4, "The row with index 4 should be blank." );
});

QUnit.test( "The next blank space should be in row index 3 when a token is dropped on 2 others", function (assert ) {
  gameState = initializeGameState();
  dropToken(0);
  dropToken(0);
  var nextBlank = getNextBlankSpace(0);
  assert.deepEqual( nextBlank, 3, "The row with index 3 should be blank." );
});

QUnit.test( "The next blank space should be in row index 2 when a token is dropped on 3 others", function (assert ) {
  gameState = initializeGameState();
  dropToken(0);
  dropToken(0);
  dropToken(0);
  var nextBlank = getNextBlankSpace(0);
  assert.deepEqual( nextBlank, 2, "The row with index 2 should be blank." );
});

QUnit.test( "The next blank space should be in row index 1 when a token is dropped on 4 others", function (assert ) {
  gameState = initializeGameState();
  dropToken(0);
  dropToken(0);
  dropToken(0);
  dropToken(0);
  var nextBlank = getNextBlankSpace(0);
  assert.deepEqual( nextBlank, 1, "The row with index 1 should be blank." );
});

QUnit.test( "The next blank space should be in row index 0 when a token is dropped on 5 others", function (assert ) {
  gameState = initializeGameState();
  dropToken(0);
  dropToken(0);
  dropToken(0);
  dropToken(0);
  dropToken(0);
  var nextBlank = getNextBlankSpace(0);
  assert.deepEqual( nextBlank, 0, "The row with index 1 should be blank." );
});

QUnit.test( "A column is disabled if it is full", function (assert ) {
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 0, 2, 2, 2],
			   [2, 2, 2, 1, 2, 2, 2],
			   [2, 2, 2, 0, 2, 2, 2],
			   [2, 2, 2, 1, 2, 2, 2],
			   [2, 2, 2, 0, 2, 2, 2]];
  var disabledColumn = document.getElementById("dropRow").childNodes[7];
  dropToken(3);
  var hasEvent = typeof disabledColumn.onclick == "function";
  assert.equal(hasEvent, false, "A full column cannot have more pieces played on it." );
});

QUnit.test( "Black wins if there are 4 consecutive horizontal black spaces", function (assert ) {
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [0, 0, 0, 0, 1, 1, 1]];
  var win = winHorizontally(5);
  assert.equal( win, true, "A win is detected." );
});

QUnit.test( "White wins if there are 4 consecutive horizontal white spaces", function (assert ) {
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [0, 0, 2, 2, 2, 2, 2],
			   [0, 0, 2, 1, 1, 1, 1]];
  var win = winHorizontally(5);
  assert.equal( win, true, "A win is detected." );
});

QUnit.test( "Black wins if there are 4 consecutive vertical black spaces", function (assert ) {
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [0, 2, 2, 2, 2, 2, 2],
			   [0, 2, 2, 2, 2, 2, 2],
			   [0, 2, 2, 2, 2, 2, 2],
			   [0, 1, 1, 1, 2, 2, 2]];
  var win = winVertically(0);
  assert.equal( win, true, "A win is detected." );
});

QUnit.test( "White wins if there are 4 consecutive vertical white spaces", function (assert ) {
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [1, 2, 2, 2, 2, 2, 2],
			   [1, 2, 2, 2, 2, 2, 2],
			   [1, 2, 2, 2, 2, 2, 2],
			   [1, 0, 0, 0, 2, 0, 2]];
  var win = winVertically(0);
  assert.equal( win, true, "A win is detected." );
});

QUnit.test( "Black wins if there are 4 consecutive black spaces on an upwards right diagonal", function (assert ) {
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 0, 2, 2, 2],
			   [2, 2, 0, 1, 2, 2, 2],
			   [2, 0, 1, 0, 2, 2, 2],
			   [0, 1, 1, 1, 0, 2, 2]];
  var win = winDiagonalRight(2, 3);
  assert.equal( win, true, "A win is detected." );
});

QUnit.test( "White wins if there are 4 consecutive white spaces on an upwards right diagonal", function (assert ) {
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 1, 2, 2, 2],
			   [2, 2, 1, 0, 2, 2, 2],
			   [2, 1, 0, 1, 2, 2, 2],
			   [1, 0, 0, 0, 2, 0, 2]];
  var win = winDiagonalRight(2, 3);
  assert.equal( win, true, "A win is detected." );
});

QUnit.test( "Black wins if there are 4 consecutive black spaces on an downwards right diagonal", function (assert ) {
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 0, 2, 2, 2],
			   [2, 2, 2, 1, 0, 2, 2],
			   [2, 2, 2, 0, 1, 0, 2],
			   [2, 0, 2, 1, 1, 1, 0]];
  var win = winDiagonalLeft(2, 3);
  assert.equal( win, true, "A win is detected." );
});

QUnit.test( "White wins if there are 4 consecutive white spaces on an downwards right diagonal", function (assert ) {
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 1, 2, 2, 2],
			   [2, 2, 2, 0, 1, 2, 2],
			   [2, 2, 2, 1, 0, 1, 2],
			   [2, 2, 2, 0, 0, 0, 1]];
  var win = winDiagonalLeft(2, 3);
  assert.equal( win, true, "A win is detected." );
});

QUnit.test( "After a token is dropped on an empty column, the board is updated with that token", function (assert ) {
  turn = 0;
  gameState = initializeGameState();
  dropToken(0);
  var expected = [[2, 2, 2, 2, 2, 2, 2],
				  [2, 2, 2, 2, 2, 2, 2],
				  [2, 2, 2, 2, 2, 2, 2],
				  [2, 2, 2, 2, 2, 2, 2],
				  [2, 2, 2, 2, 2, 2, 2],
				  [0, 2, 2, 2, 2, 2, 2]];
  assert.deepEqual(gameState, expected, "The column in which a piece was dropped should contain that piece at the first open location.");
});

QUnit.test( "After a token is dropped on a column with 1 piece, the board is updated with that token", function (assert ) {
  turn = 0;
  gameState = initializeGameState();
  dropToken(0);
  dropToken(0);
  var expected = [[2, 2, 2, 2, 2, 2, 2],
				  [2, 2, 2, 2, 2, 2, 2],
				  [2, 2, 2, 2, 2, 2, 2],
				  [2, 2, 2, 2, 2, 2, 2],
				  [1, 2, 2, 2, 2, 2, 2],
				  [0, 2, 2, 2, 2, 2, 2]];
  assert.deepEqual(gameState, expected, "The column in which a piece was dropped should contain that piece at the first open location.");
});

QUnit.test( "A message is displayed if black wins", function (assert ) {
  turn = 0;
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [0, 0, 0, 2, 1, 1, 1]];
  dropToken(3);
  assert.equal( message.innerHTML, "black wins!", "A message is displayed to show that the player won." );
});

QUnit.test( "A message is displayed if white wins", function (assert ) {
  turn = 1;
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [0, 2, 2, 2, 2, 2, 2],
			   [0, 0, 0, 2, 1, 1, 1]];
  dropToken(3);
  assert.equal( message.innerHTML, "white wins!", "A message is displayed to show that the player won." );
});

QUnit.test( "The reset button should be highlighted when the game is won by black", function (assert ) {
  turn = 0;
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [0, 0, 0, 2, 1, 1, 1]];
  dropToken(3);
  var resetButton = document.getElementById("restartGame");
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});

QUnit.test( "The reset button should be highlighted when the game is won by white", function (assert ) {
  turn = 1;
  gameState = [[2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [2, 2, 2, 2, 2, 2, 2],
			   [0, 2, 2, 2, 2, 2, 2],
			   [0, 0, 0, 2, 1, 1, 1]];
  dropToken(3);
  var resetButton = document.getElementById("restartGame");
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});

QUnit.test( "A message is displayed if the game is a tie", function (assert ) {
  gameState = [[1, 0, 1, 0, 1, 0, 1],
			   [1, 0, 1, 0, 1, 0, 1],
			   [1, 0, 1, 0, 1, 0, 1],
			   [0, 1, 0, 1, 0, 1, 0],
			   [0, 1, 0, 1, 0, 1, 0],
			   [0, 1, 0, 1, 0, 1, 0]];
  if (detectTie()) {
	  endGame("The game is a tie.");
  }
  assert.equal( message.innerHTML, "The game is a tie.", "A message is displayed to show that the game is a tie." );
});

QUnit.test( "All columns should be disabled when the game is over", function (assert ) {
  disableAllColumns();
  var columnsDisabled = [];
  for (var i = 0; i < 7; i++) {
	var disabledColumn = document.getElementById("dropRow").childNodes[2 * i + 1];
	columnsDisabled.push(typeof disabledColumn.onclick == "function");
  }
  assert.deepEqual(columnsDisabled, [false, false, false, false, false, false, false], "All columns are disabled when the game is over." );
});
