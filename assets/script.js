const outputLabel = document.getElementById('output');
let currentPlayer, p1 = 0, p2 = 0, tie = 0, turnCount = 0;

class Square {
  set(value) {
    this.value = value;
  }
}

class TicTacToe {
  constructor() {
    this.board = [];
    for (let i = 0; i < 3; i++) {
      this.board[i] = [];
      for (let j = 0; j < 3; j++) {
        this.board[i][j] = new Square();
        this.board[i][j].set('');
      }
    }
  }

  checkDiag(board) {
    if (board[0][0].value === board[1][1].value && board[1][1].value === board[2][2].value && board[0][0].value !== '') {
      return true;
    } else if (board[0][2].value === board[1][1].value && board[1][1].value === board[2][0].value && board[0][2].value !== '') {
      return true;
    }
    return false;
  }

  checkRows(board) {
    for (let i = 0; i < 3; i++) {
      if (board[i][0].value === board[i][1].value && board[i][1].value === board[i][2].value && board[i][0].value !== '') {
        return true;
      }
    }
    return false;
  }

  checkCols(board) {
    for (let i = 0; i < 3; i++) {
      if (board[0][i].value === board[1][i].value && board[1][i].value === board[2][i].value && board[0][i].value !== '') {
        return true;
      }
    }
    return false;
  }
}

const p1Img = `<ion-icon name="close-sharp"></ion-icon>`, p2Img = `<ion-icon name="ellipse-outline"></ion-icon>`;
let game = new TicTacToe();

function checkWin(board) {
  const winImg = currentPlayer === "X" ? p1Img : p2Img;

  if (game.checkDiag(board)) {
    outputLabel.innerHTML = winImg + " wins by diagonal!";
    return true;
  } else if (game.checkRows(board)) {
    outputLabel.innerHTML = winImg + " wins by row!";
    return true;
  } else if (game.checkCols(board)) {
    outputLabel.innerHTML = winImg + " wins by column!";
    return true;
  }
  return false;
}

const scoreElements = document.getElementsByClassName("score");

function addScore(player) {
	if (player === "X") scoreElements[0].textContent = ++p1;
	else if (player === "O") scoreElements[2].textContent = ++p2;
	else scoreElements[1].textContent = ++tie;
}

const squareElements = Array.from(document.getElementsByClassName('square'));
const newGameButton = document.getElementById("newGame");
newGameButton.addEventListener('click', () => {
	newGameButton.style.display = "none";
	for (const square of squareElements) {
		square.textContent = '';
		if (squareElements.indexOf(square) % 3 === 2) square.className = "square rightSquare";
		else square.className = "square";
		square.disabled = false;
	}
	turnCount = 0;
	outputLabel.textContent = "Tic-Tac-Toe";
	game = new TicTacToe();
});

squareElements.forEach((square, index) => {
  square.addEventListener('click', () => {
    const row = Math.floor(index / 3), col = index % 3;

    if (square.innerHTML !== '') return;

    if (turnCount % 2 === 0) {
			currentPlayer = 'X';
			playerImg = p1Img;
		} else {
			currentPlayer = 'O';
			playerImg = p2Img;
		}

    square.innerHTML = playerImg;
    game.board[row][col].set(currentPlayer);
		square.disabled = true;

		if (checkWin(game.board)) {
			for (const square of squareElements) square.disabled = true;
			addScore(currentPlayer);
			newGameButton.removeAttribute("style");
		} else if (++turnCount === 9) {
      outputLabel.textContent = "It's a tie!";
			addScore("tie");
			newGameButton.removeAttribute("style");
    }
  });
});