let player1 = localStorage.getItem("player1");

if (!player1) {
    window.location.href = "login.html";
}

document.getElementById("welcome").innerText =
"Welcome, " + player1 + " 👋";

let userScore = 0;
let compScore = 0;

function play(userChoice) {

    let choices = ["stone", "paper", "scissors"];
    let compChoice = choices[Math.floor(Math.random() * 3)];

    let resultText = "";

    if (userChoice === compChoice) {
        resultText = "It's a Draw!";
        document.getElementById("result").style.color = "yellow";
    }

    else if (
        (userChoice === "stone" && compChoice === "scissors") ||
        (userChoice === "paper" && compChoice === "stone") ||
        (userChoice === "scissors" && compChoice === "paper")
    ) {
        userScore++;
        resultText = player1 + " wins this round! Computer chose " + compChoice;
        document.getElementById("result").style.color = "lightgreen";
    }

    else {
        compScore++;
        resultText = "Computer wins this round! Computer chose " + compChoice;
        document.getElementById("result").style.color = "red";
    }

    document.getElementById("result").innerText = resultText;
    document.getElementById("userScore").innerText = userScore;
    document.getElementById("compScore").innerText = compScore;


    /* GAME WIN CONDITION */

    if (userScore === 3) {

        document.getElementById("result").innerText =
        player1 + " won the game - Go for next";

        resetGame();

    }

    if (compScore === 3) {

        document.getElementById("result").innerText =
        "Computer won the game - Go for next";

        resetGame();

    }

}


function resetGame() {

    setTimeout(function(){

        userScore = 0;
        compScore = 0;

        document.getElementById("userScore").innerText = 0;
        document.getElementById("compScore").innerText = 0;

        document.getElementById("result").innerText =
        "Make your move!";

    },2000);

}


function goHome() {
    window.location.href = "home.html";
}