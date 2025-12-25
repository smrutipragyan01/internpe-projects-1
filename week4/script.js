const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = "red";
let gameOver = false;

const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");

// Create Board
function createBoard() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  boardDiv.innerHTML = "";

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.column = c;
      cell.addEventListener("click", handleClick);
      boardDiv.appendChild(cell);
    }
  }
}

function handleClick(e) {
  if (gameOver) return;

  const col = e.target.dataset.column;

  for (let row = ROWS - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      updateUI(row, col);
      checkWin(row, col);
      currentPlayer = currentPlayer === "red" ? "yellow" : "red";
      statusText.textContent = `Player ${currentPlayer === "red" ? "🔴" : "🟡"}'s Turn`;
      return;
    }
  }
}

function updateUI(row, col) {
  const index = row * COLS + Number(col);
  boardDiv.children[index].classList.add(board[row][col]);
}

function checkWin(row, col) {
  if (
    checkDirection(row, col, 1, 0) ||
    checkDirection(row, col, 0, 1) ||
    checkDirection(row, col, 1, 1) ||
    checkDirection(row, col, 1, -1)
  ) {
    gameOver = true;
    statusText.textContent = `Player ${currentPlayer === "red" ? "🔴" : "🟡"} Wins! 🎉`;
  }
}

function checkDirection(row, col, rowDir, colDir) {
  let count = 1;

  count += countPieces(row, col, rowDir, colDir);
  count += countPieces(row, col, -rowDir, -colDir);

  return count >= 4;
}

function countPieces(row, col, rowDir, colDir) {
  let r = row + rowDir;
  let c = col + colDir;
  let count = 0;

  while (
    r >= 0 &&
    r < ROWS &&
    c >= 0 &&
    c < COLS &&
    board[r][c] === currentPlayer
  ) {
    count++;
    r += rowDir;
    c += colDir;
  }

  return count;
}

function resetGame() {
  gameOver = false;
  currentPlayer = "red";
  statusText.textContent = "Player 🔴's Turn";
  createBoard();
}

createBoard();
