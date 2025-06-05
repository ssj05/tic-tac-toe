const game = (() => {
  let cellvalue = ["", "", "", "", "", "", "", "", ""];
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
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");

  const cell = document.querySelectorAll(".cell");
  const statusText = document.querySelector(".statusText");
  const startBtn = document.querySelector(".start");
  const restartBtn = document.querySelector(".restart");
  let playing = false;
  let currentPlayer = player1;
  const changePlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };
  const checkName = () => {
    const name1 = player1.value.trim();
    const name2 = player2.value.trim();
    if (name1 === "" || name2 === "") {
      alert("enter player name");
      return;
    }
  };

  const start = () => {
    startBtn.addEventListener("click", () => {
      checkName();
      statusText.textContent = `${currentPlayer.value}'s turn`;
      playing = true;
    });
    initialize();
  };
  const initialize = () => {
    cell.forEach((block) => block.addEventListener("click", cellClicked));
  };
  const cellClicked = function(event) {
    checkName();
    const clickedCell = event.target;
    const index = clickedCell.getAttribute("cellindex");
    if (
      cellvalue[index] != "" ||
      !playing ||
      currentPlayer.getAttribute("value") === ""
    ) {
      return;
    }
    statusText.textContent =
      currentPlayer.value === player1.value
        ? `${player2.value}'s turn`
        : `${player1.value}'s turn`;

    console.log(currentPlayer.value);
    console.log(currentPlayer.getAttribute("sign"));

    let currentSign = currentPlayer.getAttribute("sign");

    cellvalue[index] = `${currentSign}`;
    clickedCell.textContent = `${currentSign}`;
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
      statusText.textContent = `${currentPlayer.value} won`;
      playing = false;
      return;
    } else if (!cellvalue.includes("")) {
      statusText.textContent = "Draw!";
      playing = false;
    }
  };

  const restart = () => {
    restartBtn.addEventListener("click", () => {
      cellvalue.fill("");
      cell.forEach((block) => {
        block.textContent = "";
      });
      playing = true;
      currentPlayer = player1;
      statusText.textContent = `${currentPlayer.value}'s turn`;
      cell.forEach((block) => {
        block.addEventListener("click", cellClicked);
      });
    });
  };

  return { start, restart };
})();

game.start();
game.restart();
