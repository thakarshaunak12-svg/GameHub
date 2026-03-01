const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* Middlewares */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Serve Frontend */

app.use(express.static(path.join(__dirname, "public")));

/* MongoDB */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Mongo Error:", err));


/* User Schema */

const UserSchema = new mongoose.Schema({

fullname:String,
email:String,
username:String,
age:Number,
location:String,
password:String

});

const User = mongoose.model("users",UserSchema);


/* ======================
SIGNUP
====================== */

app.post("/signup", async (req,res)=>{

try{

let user = new User(req.body);

await user.save();

res.json({

message:"✅ Account Created Successfully"

});

}
catch(err){

console.log(err);

res.json({

message:"Error Saving User"

});

}

});


/* ======================
LOGIN
====================== */

app.post("/login", async (req,res)=>{

try{

let user = await User.findOne({

username:req.body.username,
password:req.body.password

});

if(user){

res.json({

success:true,
user:user

});

}
else{

res.json({

success:false

});

}

}
catch(err){

res.json({

success:false

});

}

});


/* ======================
HOME
====================== */

app.get("/",(req,res)=>{

res.sendFile(
path.join(__dirname,"public","index.html")
);

});


/* ======================
SERVER
====================== */

const PORT = process.env.PORT || 10000;

app.listen(PORT,()=>{

console.log("🚀 Server Running on Port",PORT);

});
