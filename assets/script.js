const outputLabel = document.getElementById("output"), scoreElements = document.getElementsByClassName("score");
const p1Img = `<ion-icon name="close-sharp"></ion-icon>`, p2Img = `<ion-icon name="ellipse-outline"></ion-icon>`;
const squareElements = Array.from(document.getElementsByClassName("square"));
const newGameButton = document.getElementById("newGame"), currPlayerLabel = document.getElementById("currPlayer");
let player = "X", playerImg, p1Score = 0, p2Score = 0, ties = 0, turnCount = 0;

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
				this.board[i][j].set("");
			}
		}
	}

	checkDiag(board) {
		if (board[0][0].value === board[1][1].value && board[1][1].value === board[2][2].value && board[0][0].value !== "") {
			return true;
		} else if (board[0][2].value === board[1][1].value && board[1][1].value === board[2][0].value && board[0][2].value !== "") {
			return true;
		}
		return false;
	}

	checkRows(board) {
		for (let i = 0; i < 3; i++) {
			if (board[i][0].value === board[i][1].value && board[i][1].value === board[i][2].value && board[i][0].value !== "") {
				return true;
			}
		}
		return false;
	}

	checkCols(board) {
		for (let i = 0; i < 3; i++) {
			if (board[0][i].value === board[1][i].value && board[1][i].value === board[2][i].value && board[0][i].value !== "") {
				return true;
			}
		}
		return false;
	}
}

function checkWin(board) {
	const winImg = player === "X" ? p1Img : p2Img;

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

function addScore(player) {
	if (player === "X") scoreElements[0].textContent = ++p1Score;
	else if (player === "O") scoreElements[2].textContent = ++p2Score;
	else scoreElements[1].textContent = ++ties;
}

let game = new TicTacToe();

newGameButton.addEventListener("click", () => {
	newGameButton.style.display = "none";
	for (const square of squareElements) {
		square.textContent = "";
		square.disabled = false;
	}
	turnCount = 0;
	outputLabel.textContent = "Tic-Tac-Toe";
	currPlayerLabel.innerHTML = player === "X" ? "Current player: " + p1Img : "Current player: " + p2Img;
	currPlayerLabel.removeAttribute("style");
	game = new TicTacToe();
});

squareElements.forEach((square, index) => {
	square.addEventListener("click", () => {
		const row = Math.floor(index / 3), col = index % 3;

		if (square.innerHTML !== "") return;
		else square.innerHTML = player === "X" ? p1Img : p2Img;

		game.board[row][col].set(player);
		square.disabled = true;

		if (checkWin(game.board)) {
			for (const square of squareElements) square.disabled = true;
			currPlayerLabel.style.display = "none";
			addScore(player);
			newGameButton.removeAttribute("style");
		} else if (++turnCount === 9) {
			currPlayerLabel.style.display = "none";
			outputLabel.textContent = "It's a tie!";
			addScore("tie");
			newGameButton.removeAttribute("style");
		}

		if (player === "X") {
			player = "O";
			currPlayerLabel.innerHTML = "Current player: " + p2Img;
		} else {
			player = "X";
			currPlayerLabel.innerHTML = "Current player: " + p1Img;
		}
	});
});