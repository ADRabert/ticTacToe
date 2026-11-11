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

let game = new TicTacToe();

function checkWin(board, player) {
    if (game.checkDiag(board)) {
        outputLabel.textContent = `${player} wins by diagonal!`;
        return true;
    } else if (game.checkRows(board)) {
        outputLabel.textContent = `${player} wins by row!`;
        return true;
    } else if (game.checkCols(board)) {
        outputLabel.textContent = `${player} wins by column!`;
        return true;
    }
    return false;
}

const scoreElements = document.getElementsByClassName("score");

function addScore(player) {
		if (player === "X") {
			scoreElements[0].textContent = ++p1;
		} else if (player === "O") {
			scoreElements[1].textContent = ++p2;
		} else scoreElements[2].textContent = ++tie;
}

const squareElements = Array.from(document.getElementsByClassName('square'));

function disableAll() {
	for (const square of squareElements) {
      square.disabled = true;
			square.className += " disabled";
  }
}

const newGameButton = document.getElementById("newGame");
newGameButton.addEventListener('click', () => {
		newGameButton.style.display = "none";
		for (const square of squareElements) {
			square.textContent = '';
			square.className = "square";
			square.disabled = false;
		}
		game = new TicTacToe();
});

squareElements.forEach((square, index) => {
    square.addEventListener('click', () => {
        const row = Math.floor(index / 3);
        const col = index % 3;

        if (square.textContent !== '') return;

        if (turnCount % 2 === 0) {
            currentPlayer = 'X';
        } else {
            currentPlayer = 'O';
        }

        square.textContent = currentPlayer;
        game.board[row][col].set(currentPlayer);
				square.className += " disabled";
				square.disabled = true;

        const won = checkWin(game.board, currentPlayer);

				if (won) {
						disableAll();
						addScore(currentPlayer);
						newGameButton.removeAttribute("style");
				}
				else if (!won && ++turnCount === 9) {
            outputLabel.textContent = "It's a tie!";
						addScore("tie");
						newGameButton.removeAtrribute("style");
        }
    });
});