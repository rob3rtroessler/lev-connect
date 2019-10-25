const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

// postgres
const { Pool } = require('pg');
const pool = new Pool({
  user: "postgres",
  password: "Ajtibms12",
  port:5432,
  database: "lev-connect"
});

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
    let {signUpEmail, signUpName, signUpPassword, signUpConfirmation} = req.body;

    let responseObject = {
        permission: true,
        message: 'easy access'
    };
    res.json(responseObject);
});


app.post('/signupTwo', function (req, res) {

    // store values
    let {signUpEmail, signUpName, signUpPassword, signUpConfirmation} = req.body;

    // error checking via callback
    errorChecking(signUpEmail, signUpName, signUpPassword, signUpConfirmation, function (message) {

        // immediate feedback if no permission
        if (!message.permission){
          res.json(message);
        }

        // else, more tests
        else {
            pool.connect((err, client, done) => {
                if (err) throw err;
                client.query('SELECT * from email_list where email_address = ($1)', [signUpEmail], (err, sqlres) => {
                    done();
                    if (err) {
                        console.log(err.stack)
                    }
                    else if (sqlres.rows.length === 0 || sqlres.rows[0].email_address !== signUpEmail) {

                        message.permission = false;
                        message.message = 'use your Harvard Email address';
                        console.log('no Harvard email used', message);
                        res.json(message);
                    }
                    else {
                        console.log('everything fine', message);
                        res.json(message);
                    }
                })
            })
        }
    })
});

function errorChecking(email, name, password, confirmation, callback) {

  // no email entered
  if (!email){
    let responseObject = {
      permission: false,
      message: 'please enter an email address'
    };
    callback(responseObject);
  }
  else if (!name){
    let responseObject = {
      permission: false,
      message: 'please enter a name'
    };
    callback(responseObject);
  }
  else if (password !== confirmation){
    let responseObject = {
      permission: false,
      message: `password and password confirmation don't match`
    };
    callback(responseObject);
  }
  else {
    let responseObject = {
      permission: true,
      message: `welcome to Lev-Connect, ${name}`
    };
    callback(responseObject);
  }
}


let port = process.env.PORT;

if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

// log
console.log("Running on localhost:8000");
