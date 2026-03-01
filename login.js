function login(){

let username =
document.getElementById("username").value;

let password =
document.getElementById("password").value;

let savedUser =
localStorage.getItem("username");

let savedPass =
localStorage.getItem("password");


if(username === savedUser && password === savedPass){

// SAVE PLAYER NAME
localStorage.setItem("player1", username);

window.location.href = "home.html";

}
else{

alert("Wrong Username or Password");

}

}



function togglePassword(){

let pass =
document.getElementById("password");

if(pass.type=="password"){
pass.type="text";
}
else{
pass.type="password";
}

}


function goSignup(){

window.location.href="signup.html";

}