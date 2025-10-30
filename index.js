const path = require("path")
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")


const app = express();

const POST = 8000;//port

mongoose.connect('mongodb://localhost:27017/musicverse').then(e => console.log("MongoDB Connected"));

//middleware
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));//to parse form data
const userRoute = require('./routes/user');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get('/', (req,res) => {
    res.render("home",{
      user : req.user,  
    });
});

app.use('/user', userRoute)

app.listen(POST,()=> console.log(`Server started At PORT:${POST}`));
