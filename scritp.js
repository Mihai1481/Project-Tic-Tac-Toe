const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let board = "";
    gameboard.forEach((square, index) => {
      board += `<div class="square" id=square-${index}>${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = board;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameboard[index] = value;
    render();
  };

  const getgameboard = () => {
    return gameboard;
  };

  const restart = (i) => {
    for (i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    render();
    gameOver = false;
    document.querySelector("#message").innerHTML = "";
  };

  return {
    getgameboard,
    render,
    update,
    restart,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;
  let inputs = false;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    if (players[0].name != "" && players[1].name != "") {
      inputs = true;
    } else {
      return alert("Introduceti nume pentru ambii jucatori");
    }

    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
  };

  const handleClick = (event) => {
    if (gameOver) {
      return;
    }

    let index = parseInt(event.target.id.split("-")[1]);

    if (Gameboard.getgameboard()[index] != "") return;

    Gameboard.update(index, players[currentPlayerIndex].mark);

    if (
      checkForWin(Gameboard.getgameboard(), players[currentPlayerIndex].mark)
    ) {
      gameOver = true;
      displayController.renderMessage(
        `${players[currentPlayerIndex].name} won!`
      );
    } else if (checkForTie(Gameboard.getgameboard())) {
      gameOver = true;
      displayController.renderMessage("egalitate");
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const getCurrentPlayerIndex = () => {
    currentPlayerIndex = 0;
  };

  return {
    getCurrentPlayerIndex,
    start,
    handleClick,
  };
})();

function checkForWin(board) {
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
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }
  return false;
}

const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector("#message").innerHTML = message;
  };

  return { renderMessage };
})();

function checkForTie(board) {
  return board.every((cell) => cell != "");
}

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
  Gameboard.restart();
  Game.getCurrentPlayerIndex();
  Game.start();
});

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  if ((Game.inputs = true)) Game.start();
});
