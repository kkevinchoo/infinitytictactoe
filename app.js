document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const resetButton = document.getElementById("resetButton");
  const message = document.getElementById("message");
  let currentPlayer = "X";
  let boardState = Array(9).fill(null);
  let moveHistory = { X: [], O: [] };
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleClick(e) {
    const index = parseInt(e.target.dataset.index);

    if (!boardState[index]) {
      boardState[index] = currentPlayer;
      e.target.textContent = currentPlayer;
      moveHistory[currentPlayer].push(index);

      if (moveHistory[currentPlayer].length > 3) {
        const oldestMove = moveHistory[currentPlayer].shift();
        boardState[oldestMove] = null;
        cells[oldestMove].textContent = "";
      }

      if (checkWin(currentPlayer)) {
        message.textContent = `${currentPlayer} gana!`;
        board.removeEventListener("click", handleClick);
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  function checkWin(player) {
    return winningCombinations.some((combination) =>
      combination.every((index) => boardState[index] === player)
    );
  }

  function resetGame() {
    boardState.fill(null);
    moveHistory = { X: [], O: [] };
    cells.forEach((cell) => (cell.textContent = ""));
    message.textContent = "";
    currentPlayer = "X";
    board.addEventListener("click", handleClick);
  }

  board.addEventListener("click", handleClick);
  resetButton.addEventListener("click", resetGame);
});
