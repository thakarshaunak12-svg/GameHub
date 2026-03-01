let player1 = localStorage.getItem("player1");


let player2 = "";

let currentPlayer = "";

let player1Symbol = "";

let player2Symbol = "";



let cells = document.querySelectorAll(".cell");

let turnText = document.getElementById("turnText");



document.getElementById("player1Name").innerText =
"Player 1: " + player1;



function selectSymbol(symbol){

player1Symbol = symbol;

player2Symbol = symbol==="X"?"O":"X";



document.querySelectorAll(".setup button")
.forEach(btn=>{

btn.classList.remove("selectedSymbol");

});


event.target.classList.add("selectedSymbol");

}



function startGame(){



player2=
document.getElementById("player2").value;



if(player2.trim()==="" ||

player1Symbol==="")

{

alert("Enter Player 2 name and select symbol");

return;

}



currentPlayer=
player1Symbol==="X"?
player1:player2;



document.getElementById("setup")
.style.display="none";


document.getElementById("game")
.style.display="block";



updateTurnText();

}



function updateTurnText(){

turnText.innerText=
currentPlayer+"'s Turn";

}



cells.forEach((cell,index)=>{


cell.addEventListener("click",()=>{


if(cell.innerText!=="")
return;



if(currentPlayer===player1){

cell.innerText=player1Symbol;


cell.style.color=

player1Symbol==="X"?
"#ff2bd6":"#00f7ff";

}

else{


cell.innerText=player2Symbol;


cell.style.color=

player2Symbol==="X"?
"#ff2bd6":"#00f7ff";

}



let winnerData=

checkWinner();



if(winnerData){


highlightWinner(

winnerData.pattern);


setTimeout(()=>{

document.getElementById(
"winnerText"
).innerText=

winnerData.winner.toUpperCase()
+ " WINS!";

},300);



return;

}



currentPlayer=

currentPlayer===player1?

player2:player1;



updateTurnText();



});


});



function checkWinner(){



let winPatterns=[

[0,1,2],

[3,4,5],

[6,7,8],

[0,3,6],

[1,4,7],

[2,5,8],

[0,4,8],

[2,4,6]

];



for(let pattern of winPatterns){



let a=

cells[pattern[0]]
.innerText;


let b=

cells[pattern[1]]
.innerText;


let c=

cells[pattern[2]]
.innerText;



if(a!==""&&
a===b&&
b===c){



let winnerName;



if(a===player1Symbol)

winnerName=player1;

else

winnerName=player2;



return{

winner:winnerName,

pattern:pattern

};

}



}



return null;

}



function highlightWinner(pattern){



pattern.forEach(index=>{


cells[index]
.style.backgroundColor="yellow";



});

}



function resetGame(){

cells.forEach(cell=>{

cell.innerText="";

cell.style.backgroundColor="white";

cell.style.color="black";

});

document.getElementById(
"winnerText"
).innerText="";


currentPlayer=

player1Symbol==="X"?

player1:player2;

updateTurnText();

}



function goHome(){


window.location.href="home.html";


}