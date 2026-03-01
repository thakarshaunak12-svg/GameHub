
let nextBtn =
document.getElementById("nextBtn")

let playerBox =
document.getElementById("playerNames")

let selectedLetter = "S";

let players=[]

let scores=[]

let turn=0

let size=3

let board=[]

function selectLetter(letter){

selectedLetter = letter;

document.getElementById("selectS")
.classList.remove("selectedLetter");

document.getElementById("selectO")
.classList.remove("selectedLetter");


if(letter=="S")
document.getElementById("selectS")
.classList.add("selectedLetter");

else
document.getElementById("selectO")
.classList.add("selectedLetter");

}

/* NEXT BUTTON */


nextBtn.onclick=function(){

let count=
document.getElementById("players").value


playerBox.innerHTML=""


for(let i=2;i<=count;i++){

playerBox.innerHTML+=

`

<br>

Player ${i}

<br>

<input id="p${i}">

`

}



playerBox.innerHTML+=

`

<br><br>

<button onclick="startGame()">

Start

</button>

`

}



/* START GAME */


function startGame(){


let count=
document.getElementById("players").value


size=
document.getElementById("boardSize").value



players=[]


players[0]="Shaunak"



for(let i=2;i<=count;i++){

players[i-1]=

document.getElementById("p"+i).value

}



scores=
new Array(players.length).fill(0)



document.getElementById("setup")
.classList.add("hidden")


document.getElementById("game")
.classList.remove("hidden")



createBoard()

showTurn()

updateScore()

}



/* CREATE BOARD */


function createBoard(){


board=[]


let b=
document.getElementById("board")


b.innerHTML=""


b.style.gridTemplateColumns=

"repeat("+size+",70px)"



for(let i=0;i<size;i++){

board[i]=[]


for(let j=0;j<size;j++){


board[i][j]=""


let cell=
document.createElement("div")


cell.className="cell"


cell.onclick=function(){

play(i,j,cell)

}


b.appendChild(cell)


}


}



}



/* PLAY */


function play(r,c,cell){


if(board[r][c]!="")
return


board[r][c]=selectedLetter

cell.innerHTML=selectedLetter;



let gained=
checkSOS(r,c)



scores[turn]+=gained



if(gained==0){

turn++

if(turn>=players.length)

turn=0

}



updateScore()

showTurn()



if(fullBoard()){

endGame()

}


}



/* SCORE */


function updateScore(){

let text=""


for(let i=0;i<players.length;i++){

text+=

players[i]+" : "+scores[i]+"<br>"

}


document.getElementById("scoreBox")
.innerHTML=text

}



/* TURN */


function showTurn(){

document.getElementById("turnText")
.innerText=

players[turn]+" Turn"

}



/* FULL BOARD */


function fullBoard(){

for(let i=0;i<size;i++){

for(let j=0;j<size;j++){

if(board[i][j]=="")
return false

}

}

return true

}



/* END GAME */


function endGame(){


let max=-1

let winner=""


for(let i=0;i<players.length;i++){

if(scores[i]>max){

max=scores[i]

winner=players[i]

}

}


document.getElementById("winner")
.innerText=

winner+" Wins"

}



/* CHECK SOS */


function checkSOS(r,c){

let total=0


total+=test(r,c,0,1)

total+=test(r,c,1,0)

total+=test(r,c,1,1)

total+=test(r,c,1,-1)


return total

}



/* TEST */


function test(r,c,dr,dc){

let count=0


for(let i=-2;i<=0;i++){

let r1=r+i*dr

let c1=c+i*dc


let r2=r1+dr

let c2=c1+dc


let r3=r2+dr

let c3=c2+dc


if(valid(r1,c1)&&
valid(r2,c2)&&
valid(r3,c3)){

if(

board[r1][c1]=="S"&&
board[r2][c2]=="O"&&
board[r3][c3]=="S"

){

highlight(r1,c1,r2,c2,r3,c3)

count++

}

}

}


return count

}



/* HIGHLIGHT */


function highlight(r1,c1,r2,c2,r3,c3){

let cells=
document.getElementsByClassName("cell")


cells[r1*size+c1]
.classList.add("sos")


cells[r2*size+c2]
.classList.add("sos")


cells[r3*size+c3]
.classList.add("sos")

}



/* VALID */


function valid(r,c){

return r>=0 &&
c>=0 &&
r<size &&
c<size

}
function resetGame() {

board = [];

let cells = document.querySelectorAll(".cell");

cells.forEach(cell=>{
cell.innerText="";
cell.style.backgroundColor="";
});

scores = {};
players.forEach(p=>scores[p]=0);

updateScores();

currentPlayerIndex=0;

document.getElementById("turnDisplay").innerText =
players[0] + " Turn";

}