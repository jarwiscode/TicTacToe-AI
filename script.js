let boardData = [
[0,0,0],
[0,0,0],
[0,0,0]
]

let player = 1;

const cellElements = document.querySelectorAll(".cell");

cellElements.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        placeMarker(index);
    });
});

function placeMarker(index) {
    let col = index % 3
    let row = (index - col) / 3
    if(boardData[row][col] == 0) {
        boardData[row][col] = player;
        player *= -1;
        drawMarkers();
        checkResult();
    }
}

function drawMarkers() {
    for(let row = 0; row < 3; row++) {
        for(let col = 0; col < 3; col++) {
            if(boardData[row][col] == 1) {
                cellElements[(row * 3) + col].classList.add("cross");
            } else if(boardData[row][col] == -1) {
                cellElements[(row * 3) + col].classList.add("circle");
            }
        }
    }
}

function checkResult() {
    for(let i = 0; i < 3; i++) {
        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
        if(rowSum == 3 || colSum == 3) {
            console.log("Игрок под номером 1 победил")
        } else if(rowSum == -3 || colSum == -3) {
            console.log("Игрок под номером 2 победил")
        }


        let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
        let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
        if(diagonalSum1 == 3 || diagonalSum2 == 3) {
            console.log("Игрок под номером 1 победил")
        } else if(diagonalSum1 == -3 || diagonalSum2 == -3) {
            console.log("Игрок под номером 2 победил")
        }
    }

    if(boardData[0].indexOf(0) == -1 &&
        boardData[1].indexOf(0) == -1 &&
        boardData[2].indexOf(0) == -1) {
        console.log("Tie")
    }
}