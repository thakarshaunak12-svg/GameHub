let player = localStorage.getItem("player1");

if (!player) {
    window.location.href = "login.html";
}

document.getElementById("helloText").innerText = "Hello, " + player + " 👋";

function goHome() {
    window.location.href = "home.html";
}

function startGame() {

    let filledCount = parseInt(document.getElementById("difficulty").value);

    document.getElementById("setupCard").style.display = "none";
    document.getElementById("gameCard").style.display = "block";

    generateSudoku(filledCount);
}

function generateSudoku(filledCount) {

    let board = createSolvedBoard();

    // total cells = 81
    let cellsToRemove = 81 - filledCount;

    while (cellsToRemove > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        if (board[row][col] !== 0) {
            board[row][col] = 0;
            cellsToRemove--;
        }
    }

    renderBoard(board);
}

function renderBoard(board) {

    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            let input = document.createElement("input");
            input.classList.add("cell");
            input.maxLength = 1;

            if (board[row][col] !== 0) {
                input.value = board[row][col];
                input.disabled = true;

                // GREEN filled cells
                input.style.backgroundColor = "#a5f3a5";
                input.style.fontWeight = "bold";
            }

            boardDiv.appendChild(input);
        }
    }
}

function createSolvedBoard() {

    let base = [
        [1,2,3,4,5,6,7,8,9],
        [4,5,6,7,8,9,1,2,3],
        [7,8,9,1,2,3,4,5,6],
        [2,3,4,5,6,7,8,9,1],
        [5,6,7,8,9,1,2,3,4],
        [8,9,1,2,3,4,5,6,7],
        [3,4,5,6,7,8,9,1,2],
        [6,7,8,9,1,2,3,4,5],
        [9,1,2,3,4,5,6,7,8]
    ];

    // shuffle rows randomly
    for (let i = 0; i < 30; i++) {
        let r1 = Math.floor(Math.random() * 9);
        let r2 = Math.floor(Math.random() * 9);
        [base[r1], base[r2]] = [base[r2], base[r1]];
    }

    return base;
}