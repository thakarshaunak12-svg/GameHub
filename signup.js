function signup(){

let fullname=document.getElementById("fullname").value;
let email=document.getElementById("email").value;
let username=document.getElementById("username").value;
let age=document.getElementById("age").value;
let location=document.getElementById("location").value;
let password=document.getElementById("password").value;
let confirmPassword=document.getElementById("confirmPassword").value;
let message=document.getElementById("message");


if(fullname=="" || email=="" || username=="" || age=="" || location=="" || password=="" || confirmPassword==""){

message.innerHTML="Fill all details";
message.style.color="red";
return;

}


if(password!==confirmPassword){

message.innerHTML="Passwords do not match";
message.style.color="red";
return;

}


// SEND DATA TO SERVER

fetch("https://gamehub-ey1e.onrender.com/signup",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

fullname:fullname,
email:email,
username:username,
age:age,
location:location,
password:password

})

})

.then(res=>res.json())

.then(data=>{

message.innerHTML=data.message;
message.style.color="green";

})

.catch(err=>{

message.innerHTML="Server Error";
message.style.color="red";

});

}



function togglePassword(){

let pass=document.getElementById("password");

pass.type=(pass.type=="password")?"text":"password";

}



function toggleConfirmPassword(){

let pass=document.getElementById("confirmPassword");

pass.type=(pass.type=="password")?"text":"password";

}



function goLogin(){

window.location.href="login.html";

}
