let players=[]
let fillTurn=0
let calledNumbers=[]
let turnIndex=0
let bingoProgress={}



// LOGIN CHECK

let player=
localStorage.getItem("player1")

if(!player){

location.href="login.html"

}


document.getElementById(
"player1Name"
).innerText=player




function goHome(){

location.href="home.html"

}





// ASK NAMES

function askNames(){

let count=
document.getElementById(
"playerCount"
).value


if(count<2||count>10){

alert("2-10 players")
return

}


let div=
document.getElementById(
"otherPlayers"
)

div.innerHTML=""


for(let i=2;i<=count;i++){

div.innerHTML+=`

<input
class="playerName"
placeholder="Player ${i} name">

<br>

`

}


div.innerHTML+=`

<button
class="primary-btn"
onclick="setupBoards()">

Next

</button>

`

}




// SETUP BOARDS

function setupBoards(){

players=[]

players.push({
name:player,
board:[]
})


let inputs=
document.querySelectorAll(
"#otherPlayers input"
)


inputs.forEach(i=>{

players.push({
name:i.value,
board:[]
})

})


players.forEach(p=>{

bingoProgress[p.name]=0

})


fillTurn=0

showFillBoard()

}





// FILL BOARD

function showFillBoard(){

let div=
document.getElementById(
"otherPlayers"
)

div.innerHTML=""


let p=
players[fillTurn]


div.innerHTML+=`

<h2>

${p.name} Fill Numbers

</h2>


<div class="grid">

${makeInputs(fillTurn)}

</div>


<button
class="primary-btn"
onclick="saveBoard()">

Next Player

</button>

`

}




function makeInputs(id){

let html=""

for(let i=0;i<25;i++){

html+=`

<input
class="cellInput"
id="p${id}c${i}"
type="number"
min="1"
max="25">

`

}

return html

}





// SAVE BOARD

function saveBoard(){

let board=[]
let used=[]


for(let i=0;i<25;i++){

let v=
document.getElementById(
`p${fillTurn}c${i}`
).value


v=parseInt(v)


if(isNaN(v)||v<1||v>25){

alert("1-25 only")
return

}


if(used.includes(v)){

alert("Duplicate number")
return

}


used.push(v)

board.push(v)

}


players[fillTurn].board=board

fillTurn++


if(fillTurn>=players.length){

startGame()
return

}


showFillBoard()

}





// START GAME

function startGame(){

document.getElementById(
"setup"
).classList.add("hidden")


document.getElementById(
"game"
).classList.remove("hidden")


renderBoards()

updateTurn()

}





// DRAW BOARDS

function renderBoards(){

let div=
document.getElementById(
"boards"
)

div.innerHTML=""


players.forEach(p=>{


let safe=
p.name.replace(/\s/g,"_")


let board=`

<div class="playerBoard">

<h3>

${p.name}

<span id="bingo_${safe}">
()
</span>

</h3>


<div class="grid">

`


p.board.forEach(n=>{

board+=`

<div
class="cell"
data-num="${n}">

${n}

</div>

`

})


board+=`

</div>

</div>

`

div.innerHTML+=board

})

}





function updateTurn(){

document.getElementById(
"turnText"
).innerText=

players[turnIndex].name.toUpperCase()
+
"'s Turn To Call"

}





// CALL NUMBER

function callNumber(){

let num=
document.getElementById(
"numberInput"
).value


num=parseInt(num)


if(num<1||num>25){

alert("1-25 only")
return

}


if(calledNumbers.includes(num)){

alert("Already called")
return

}


calledNumbers.push(num)


document.getElementById(
"calledNumber"
).innerText=num



document.querySelectorAll(
".cell"
).forEach(c=>{

if(c.dataset.num==num){

c.classList.add("marked")

}

})



checkWinner()


turnIndex++

if(turnIndex>=players.length){

turnIndex=0

}


updateTurn()

}




// CHECK WINNER

function checkWinner(){

let lines=[

[0,1,2,3,4],
[5,6,7,8,9],
[10,11,12,13,14],
[15,16,17,18,19],
[20,21,22,23,24],

[0,5,10,15,20],
[1,6,11,16,21],
[2,7,12,17,22],
[3,8,13,18,23],
[4,9,14,19,24],

[0,6,12,18,24],
[4,8,12,16,20]

]


players.forEach(p=>{


let score=0


lines.forEach(line=>{

let ok=line.every(i=>

calledNumbers.includes(
p.board[i]
)

)

if(ok) score++

})


let letters="BINGO"


if(score>bingoProgress[p.name]){

bingoProgress[p.name]=score


let text=
letters.substring(0,score)


let safe=
p.name.replace(/\s/g,"_")


document.getElementById(
"bingo_"+safe
).innerText=

"("+text+")"

}



if(score>=5){

document.getElementById(
"winnerText"
).innerText=

p.name.toUpperCase()
+
" WINS BINGO!"


document.getElementById(
"numberInput"
).disabled=true

}

})

}