const outputLabel = document.getElementById('output');
const board = document.getElementById('board');
let p1, p2, tie, currentPlayer;
let turnCount = 0;

class Square {
    constructor() {
        this.value = '';
    }
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
        }

        if (board[0][2].value === board[1][1].value && board[1][1].value === board[2][0].value && board[0][2].value !== '') {
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

const game = new TicTacToe();

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

const squareElements = Array.from(document.getElementsByClassName('square'));

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

        const won = checkWin(game.board, currentPlayer);

        turnCount++;

        if (!won && turnCount === 9) {
            outputLabel.textContent = "It's a tie!";
            for (const square of squareElements) {
                square.disabled = true;
            }
        }
    });
});