const express = require("express");
const path = require('path');
//const mysql = require('mysql');

const wwwhisper = require('connect-wwwhisper');
// app holds a reference to express or connect framework, it
// may be named differently in your source file.
const app = express();

app.use(wwwhisper());

// Alternatively, if you don't want wwwhisper to insert
// a logout iframe into HTML responses use.
app.use(wwwhisper(false));

// Initialize Express

app.use(express.static('static'));




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
