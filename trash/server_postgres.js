const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const flash = require("connect-flash");
const passport = require("passport");
const request = require("request");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");


app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
const expressSession = require("express-session");
app.use(expressSession({secret: "mySecretKey"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('static'));
app.use(flash());
app.use(session({secret: "keyboard cat"}))
app.use(bodyParser());
app.set("view engine", "pug");
app.set("view options", { layout: false });




app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});



let port = process.env.PORT;

if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

// log
console.log("Running on localhost:8000");
