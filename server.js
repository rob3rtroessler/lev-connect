const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');


// postgres
const { Pool } = require('pg');
const pool = new Pool({
/*  user: "postgres",
  password: "test",
  port:5432,
  database: "lev-connect"*/
    user: "vxvomjalsoktdz",
    password: "f70fabdaabde93ae33b33e031658714c9f6b02da1d7e9043554902b059460d5e",
    port:5432,
    database: "d4h6gl41uecc6l"
});

// init express
const app = express();
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// init bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


// index
app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/test', function(req,res){
    res.json({error: 'missing or invalid authorization header'});
});

// login route
app.post('/login',function(req,resRoute){

    // store values
    let {loginEmail, loginPassword} = req.body;

    // callback - checkout a client
    pool.connect((err, client, done) => {
        if (err) throw err;

        // get row from users -> error checking
        client.query('SELECT * FROM users WHERE email = $1', [loginEmail], (err, resSqlSelect) => {
            done();

            let responseObject = {
                permission: false,
                message: ''
            };

            if (err) {
                console.log(err.stack);
            }
            else {
                if (resSqlSelect.rows[0] === undefined) {
                    responseObject.message = `this email doesn't exist!`;
                    resRoute.json(responseObject);
                }
                else if (!bcrypt.compareSync(loginPassword, resSqlSelect.rows[0].password)) {
                    responseObject.message = `password doesn't match!`;
                    resRoute.json(responseObject);
                }
                else if (bcrypt.compareSync(loginPassword, resSqlSelect.rows[0].password)) {
                    responseObject.permission = true;
                    responseObject.message = `welcome to Lev-Connect`;
                    resRoute.json(responseObject);
                }
            }
        });
    });
});


// register route
app.post('/register', function (req, resRoute) {

    // store values
    let {signUpEmail, signUpPassword, signUpConfirmation} = req.body;

    // error checking via callback
    errorChecking(signUpEmail, signUpPassword, signUpConfirmation, function (message) {

        // immediate feedback if no permission
        if (!message.permission){
            resRoute.json(message);
        }

        // else, more tests
        else {
            pool.connect((errPool, client, done) => {
                if (errPool) throw errPool;
                client.query('SELECT * from email_list where email_address = ($1)', [signUpEmail], (errSQLSelect, resSqlSelect) => {
                    done();
                    if (errSQLSelect) {
                        console.log(errSQLSelect.stack)
                    }
                    else if (resSqlSelect.rows.length === 0 || resSqlSelect.rows[0].email_address !== signUpEmail) {

                        message.permission = false;
                        message.message = 'use your Harvard Email address';
                        console.log('no Harvard email used', message);
                        resRoute.json(message);
                    }
                    else {
                        console.log('everything fine', message);

                        // hash pw
                        bcrypt.hash(signUpPassword, saltRounds, function(errHash, hash) {

                            // enter new user into table 'users' using callback - store hash rather than actual pw.
                            client.query('INSERT INTO users(email, password) VALUES ($1, $2)', [signUpEmail, hash], (errSqlInsert, resSqlInsert) => {
                                if (errSqlInsert) {
                                    console.log(errSqlInsert.stack);
                                    message.permission = false;
                                    message.message = 'this email is already registered';
                                    resRoute.json(message);
                                } else {
                                    console.log(resSqlInsert.rows[0]);
                                    resRoute.json(message);
                                }
                            });
                        });
                    }
                })
            })
        }
    })
});

function errorChecking(email, password, confirmation, callback) {

  // no email entered
  if (!email){
    let responseObject = {
      permission: false,
      message: 'please enter an email address'
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
      message: `welcome to Lev-Connect!`
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
