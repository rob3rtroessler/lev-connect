const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

// init express
const app = express();
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/login',function(req,res){
  res.sendFile(__dirname + '/login.html');
});

app.post('/signup', function (req, res) {
  console.log(req.body);

  // no email entered
  if (!req.body.signUpEmail){
    res.json({
      permission: false,
      message: 'please enter an email address'
        })
  }
  // no name entered
  else if (!req.body.signUpName){
    res.json({
      permission: false,
      message: 'please enter a name'
    })
  }
  // no name entered
  else if (!req.body.signUpPassword){
    res.json({
      permission: false,
      message: 'please enter a password'
    })
  }
  // password not the same
  else if (req.body.signUpPassword !== req.body.signUpPassword){
    res.json({
      permission: false,
      message: `password and password confirmation don't match`
    })
  }
  // email not in database
  else if (req.body.signUpPassword !== req.body.signUpPassword){
    res.json({
      permission: false,
      message: `password and password confirmation don't match`
    })
  }
  else {
    res.json({
      permission: true,
      message: `you're in!`
    })
  }
});



let port = process.env.PORT;

if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

// log
console.log("Running on localhost:8000");
