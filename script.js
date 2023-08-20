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

function placeMarker(index) {
    const col = index % 3;
    const row = Math.floor(index / 3);
    if (boardData[row][col] === EMPTY && !gameOver) {
        boardData[row][col] = player;
        player *= -1;
        drawMarkers();
        checkResult();
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
