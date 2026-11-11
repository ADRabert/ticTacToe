const outputLabel = document.getElementById('output');
let p1, p2, tie, currentPlayer;
for (let square of document.getElementsByClassName('square')) {
    square.addEventListener('click', (i) => {
        if (i % 2 === 0) {
            currentPlayer = 'X';
        } else {
            currentPlayer = 'O';
        }
        square.textContent = currentPlayer;
				square.disabled = true;
				square.className = "square disabled";
    });
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
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
            return true
        }

        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
            return true
        }
        return false;
    }

    checkRows(board) {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
                return true;
            }
        }
        return false;
    }

    checkCols(board) {
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
                return true;
            }
        }
        return false;
    }
}
class Square {
    set(value) {
        this.value = value;
    }
}

function checkWin(board, player) {
    if (checkDiag(board)) {
        outputLabel.textContent = `${player} wins by diagonal!`;
    } else if (checkRows(board)) {
        outputLabel.textContent = `${player} wins by row!`;
    } else if (checkCols(board)) {
        outputLabel.textContent = `${player} wins by column!`;
    }
}



function gameLogic(symbol, board) {
    
}