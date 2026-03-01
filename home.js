let player1 = localStorage.getItem("player1");

if (!player1) {
    window.location.href = "login.html";
}

document.getElementById("welcome").innerText =
"Welcome, " + player1 + " 👋";

function playGame() {
    window.location.href = "ttt.html";
}

function logout() {
    localStorage.removeItem("player1");
    window.location.href = "login.html";
}

function playSPS() {
    window.location.href = "sps.html";
}

function playSudoku() {
    window.location.href = "sudoku.html";
}

function playbingo() {
    window.location.href = "bingo.html";
}

function playsos() {
    window.location.href = "sos.html";
}