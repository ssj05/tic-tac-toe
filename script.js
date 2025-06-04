const game = (() => {
  let cellvalue = ["", "", "", "", "", "", "", "", "", ""];
  const winIndex = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const cell = document.querySelectorAll(".cell");
  const statusText = document.querySelector(".statusText");
  const startBtn = document.querySelector(".start");
  const restartBtn = document.querySelector(".restart");
  let playing = false;
  let currentPlayer = "X";
  const changePlayer = () => {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
  };
  const start = () => {
    startBtn.addEventListener("click", () => {
      playing = true;
    });
    initialize();
  };
  const initialize = () => {
    cell.forEach((block) => block.addEventListener("click", cellClicked));
  };
  const cellClicked = function(event) {
    const clickedCell = event.target;
    const index = clickedCell.getAttribute("cellindex");

    if (cellvalue[index] != "" || !playing) {
      return;
    }

    cellvalue[index] = `${currentPlayer}`;
    this.textContent = `${currentPlayer}`;
    checkWinner();
    changePlayer();
  };

  const checkWinner = function() {
    let roundWon = false;
    for (let i = 0; i < winIndex.length; i++) {
      const condition = winIndex[i];
      let valA = cellvalue[condition[0]];
      let valB = cellvalue[condition[1]];
      let valC = cellvalue[condition[2]];

      if (valA == "" || valB == "" || valC == "") {
        continue;
      }
      if (valA === valB && valB === valC) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      statusText.textContent = `${currentPlayer} won`;
      playing = false;
      return;
    } else if (!cellvalue.includes("")) {
      statusText.textContent = "Draw!";
      playing = false;
    }
  };

  const restart = () => {
    restartBtn.addEventListener("click", () => {
      cellvalue.forEach((block) => (block = ""));
      cell.forEach((block) => {
        block.textContent = "";
        block.removeEventListener("click", cellClicked);
      });
      startBtn.removeEventListener();

      start();
    });
  };

  return { start, restart };
})();

game.start();
game.restart();
