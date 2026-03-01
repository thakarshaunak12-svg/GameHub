const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB Connection

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

console.log("MongoDB Connected");

})
.catch((err)=>{

console.log("Mongo Error:",err);

});



// Schema

const UserSchema = new mongoose.Schema({

fullname:String,
email:String,
username:String,
age:Number,
location:String,
password:String

});

const User = mongoose.model("users",UserSchema);




// SIGNUP API

app.post("/signup", async (req,res)=>{

try{

let user = new User(req.body);

await user.save();

res.json({

message:"✅ Account Created Successfully"

});

}
catch(err){

res.json({

message:"Error Saving User"

});

}

});




// LOGIN API

app.post("/login", async (req,res)=>{

let user = await User.findOne({

username:req.body.username,
password:req.body.password

});


if(user){

res.json({

status:"success",
user:user

});

}
else{

res.json({

status:"fail"

});

}

});



// Server

app.listen(3000,()=>{

console.log("Server Running on 3000");

});