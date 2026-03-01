function login(){

let username=document.getElementById("username").value;

let password=document.getElementById("password").value;


// SEND DATA TO SERVER

fetch("https://gamehub-ey1e.onrender.com/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username:username,
password:password

})

})

.then(response => response.json())

.then(data => {

if(data.status=="success"){

localStorage.setItem("player1",username);

window.location.href="home.html";

}
else{

alert("Wrong Username or Password");

}

})

.catch(error => {

alert("Server Error");

console.log(error);

});

}



function togglePassword(){

let pass=document.getElementById("password");

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
