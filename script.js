const cellElements = document.querySelectorAll(".cell");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart");

const EMPTY = 0;
const PLAYER_X = 1;
const PLAYER_O = -1;
const GAME_STATUS = {
    DRAW: 0,
    X_WINS: 1,
    O_WINS: 2
};

let boardData = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];

let player = PLAYER_X;
let gameOver = false;

cellElements.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        placeMarker(index);
    });
});

function checkWin(player) {
    for (let i of [0, 1, 2]) {
        const rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        const colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
        if (rowSum === 3 * player || colSum === 3 * player) {
            return true;
        }
    }

    const diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
    const diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
    if (diagonalSum1 === 3 * player || diagonalSum2 === 3 * player) {
        return true;
    }

    return false;
}


function placeMarker(index) {
    let col = index % 3;
    let row = Math.floor(index / 3);
    if (boardData[row][col] === EMPTY && !gameOver) {
        boardData[row][col] = player;
        player *= -1;
        drawMarkers();
        checkResult();

        if (!gameOver && player === PLAYER_O) {
            makeRandomAIMove();
        }
    }
}

function makeRandomAIMove() {
    if (gameOver) return;

    const availableCells = [];
    const potentialWinningMoves = [];
    const blockingMoves = [];

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (boardData[row][col] === EMPTY) {
                availableCells.push({ row, col });

                // Проверяем, есть ли у ИИ возможность завершить ряд
                boardData[row][col] = PLAYER_O;
                if (checkWin(PLAYER_O)) {
                    potentialWinningMoves.push({ row, col });
                }

                // Проверяем, есть ли у пользователя возможность завершить ряд
                boardData[row][col] = PLAYER_X;
                if (checkWin(PLAYER_X)) {
                    blockingMoves.push({ row, col });
                }

                boardData[row][col] = EMPTY;
            }
        }
    }

    if (potentialWinningMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * potentialWinningMoves.length);
        const winningMove = potentialWinningMoves[randomIndex];
        const index = winningMove.row * 3 + winningMove.col;
        placeMarker(index);
    } else if (blockingMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * blockingMoves.length);
        const blockingMove = blockingMoves[randomIndex];
        const index = blockingMove.row * 3 + blockingMove.col;
        placeMarker(index);
    } else if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const randomMove = availableCells[randomIndex];
        const index = randomMove.row * 3 + randomMove.col;
        placeMarker(index);
    }
}




function drawMarkers() {
    for (const [row, rowData] of boardData.entries()) {
        for (const [col, marker] of rowData.entries()) {
            const cellIndex = row * 3 + col;
            if (marker === PLAYER_X) {
                cellElements[cellIndex].classList.add("cross");
            } else if (marker === PLAYER_O) {
                cellElements[cellIndex].classList.add("circle");
            }
        }
    }
}

function checkResult() {
    for (let i of [0, 1, 2]) {
        const rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        const colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
        if (rowSum === 3 || colSum === 3) {
            endGame(GAME_STATUS.X_WINS);
            return;
        } else if (rowSum === -3 || colSum === -3) {
            endGame(GAME_STATUS.O_WINS);
            return;
        }
    }

    const diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
    const diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
    if (diagonalSum1 === 3 || diagonalSum2 === 3) {
        endGame(GAME_STATUS.X_WINS);
        return;
    } else if (diagonalSum1 === -3 || diagonalSum2 === -3) {
        endGame(GAME_STATUS.O_WINS);
        return;
    }

    if (boardData.every(row => row.every(cell => cell !== EMPTY))) {
        endGame(GAME_STATUS.DRAW);
    }
}

function endGame(status) {
    gameOver = true;
    if (status === GAME_STATUS.DRAW) {
        resultElement.innerText = "Ничья!";
    } else if (status === GAME_STATUS.X_WINS) {
        resultElement.innerText = "Победа крестиков!";
    } else {
        resultElement.innerText = "Победа ноликов!";
    }
}

restartButton.addEventListener("click", () => {
    boardData = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
    ];
    player = PLAYER_X;
    gameOver = false;
    cellElements.forEach(cell => {
        cell.classList.remove("cross", "circle");
    });
    resultElement.innerText = "";
});
