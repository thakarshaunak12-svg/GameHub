const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());


// ⭐ Serve Frontend Files
app.use(express.static("public"));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ Mongo Error:", err);
});


// User Schema
const UserSchema = new mongoose.Schema({

    fullname:String,
    email:String,
    username:String,
    age:Number,
    location:String,
    password:String

});


const User = mongoose.model("users",UserSchema);



// ======================
// SIGNUP API
// ======================

app.post("/signup", async (req,res)=>{

try{

let user = new User({

fullname:req.body.fullname,
email:req.body.email,
username:req.body.username,
age:req.body.age,
location:req.body.location,
password:req.body.password

});

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



// ======================
// LOGIN API
// ======================

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



// ======================
// Home Route Fix
// ======================

app.get("/",(req,res)=>{

res.sendFile(__dirname + "/public/index.html");

});



// ======================
// Server Start
// ======================

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log("🚀 Server Running on Port",PORT);

});
