const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

// express
const app = express();
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname,'static','img','favicon','favicon.png')));

// postgres
const { Pool } = require('pg');
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: process.env.DB_DATABASE
});

/*
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: process.env.DB_DATABASE

    user: "postgres",
    password: "test",
    port:5432,
    database: "lev-connect"
*/

// init bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// init nodemailer
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});
let mailOptions = {
    from: `levconnect.harvard@gmail.com`,
    to: `placeholder`,
    subject: 'Lev-Connect Registration',
    text: 'placeholder'
};

//
const csv = require('csv-parser');
const fs = require('fs');
const tutorData = [];

fs.createReadStream('dataFinal.csv')
    .pipe(csv())
    .on('data', (data) => tutorData.push(data))
    .on('end', () => {
        // success case, the file was saved
        console.log('data wrangling done');
    });


/* * * * * * * * * * * *
*        ROUTES        *
 * * * * * * * * * * * */

// index
app.get('/', function(req,res){ res.sendFile(__dirname + '/index.html'); });

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
                message: '',
                data: {}
            };

            if (err) {
                console.log(err.stack);
            }
            else {
                if (resSqlSelect.rows[0] === undefined) {
                    responseObject.message = `there's no account with this email!`;
                    resRoute.json(responseObject);
                }
                else if (!bcrypt.compareSync(loginPassword, resSqlSelect.rows[0].password)) {
                    responseObject.message = `password doesn't match!`;
                    resRoute.json(responseObject);
                }
                else if (bcrypt.compareSync(loginPassword, resSqlSelect.rows[0].password)) {
                    responseObject.permission = true;
                    responseObject.message = `welcome to Lev-Connect`;
                    responseObject.data = {data: tutorData};
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
                        message.message = 'use your Harvard Email address; if you continue having problems please contact levconnect.harvard@gmail.com';
                        console.log('no Harvard email used', message);
                        resRoute.json(message);
                    }
                    else {
                        console.log('everything fine', message);

                        // hash pw
                        bcrypt.hash(signUpPassword, saltRounds, function(errHashPw, hashedPassword) {

                            let tokenBeforeHashing = hashedPassword + signUpEmail;

                            // hash token;
                            bcrypt.hash(tokenBeforeHashing, saltRounds, function(errHashToken, hashedToken) {

                                // make sure there's no problem with hashedToken;
                                hashedToken = hashedToken.split('/').join('');

                                // new: enter user info in table up_for_registration
                                client.query('INSERT INTO registration(email, password, token) VALUES ($1, $2, $3)', [signUpEmail, hashedPassword, hashedToken], (errSqlInsert, resSqlInsert) => {
                                    if (errSqlInsert) {
                                        console.log(errSqlInsert.stack);
                                        message.permission = false;
                                        message.message = 'this email has already been registered; if you continue having problems please contact levconnect.harvard@gmail.com';
                                        resRoute.json(message);
                                    } else {
                                        console.log('sending email');
                                        mailOptions.to = signUpEmail;
                                        mailOptions.html = `<h1>Welcome to Lev-Connect!</h1> <p>you have tried to register with the following email: ${signUpEmail}. Please verify your account by clicking on the following <a href="https://lev-connect.herokuapp.com/confirmation/${hashedToken}">link</a>`;
                                        //mailOptions.html = `<h1>Welcome to Lev-Connect!</h1> <p>you have tried to register with the following email: ${signUpEmail}. Please verify your account by clicking on the following <a href="http://localhost:8000/confirmation/${hashedToken}">link</a>`;

                                        transporter.sendMail(mailOptions, function (err, res) {
                                            if(err){
                                                console.log('Error');
                                            } else {
                                                console.log('Email Sent');
                                            }
                                        });

                                        // send email;
                                        message.permission = false;
                                        message.message = 'an authorization email has been sent to ' + signUpEmail + '. Please follow the provided link to activate your account.';

                                        resRoute.json(message);
                                    }
                                });
                            });
                        });
                    }
                })
            })
        }
    })
});

// confirmation
app.get('/confirmation/:token', function(req,res){

    // first, store token and
    let token = req.params.token;

    // use it to check it against the registration table
    pool.connect((err, client, done) => {
        if (err) throw err;

        // get row from users -> error checking
        client.query('SELECT * FROM registration WHERE token = $1', [token], (errSql, resSqlSelect) => {
            done();

            // initiate response object;
            let responseObject = {
                permission: false,
                message: ''
            };

            // throw error
            if (errSql) {
                console.log(err.stack);
                res.status(400).send('an error occurred in the database - please contact levconnect.harvard@gmail.com!');
            }

            else if (resSqlSelect.rows[0] === undefined) {
                res.status(400).send(`access token not valid!`)
            }

            // otherwise, more error checking
            else {
                let {email, password} = resSqlSelect.rows[0];

                // insert info into users -> create new user
                client.query('INSERT INTO users(email, password) VALUES ($1, $2)', [email, password], (errSqlInsert, resSqlInsert) => {
                    // if there's an error
                    if (errSqlInsert) {
                        console.log(errSqlInsert.stack);
                        res.status(400).send(`Your email is already registered!`)
                    }
                    else {
                        console.log(`the email ${email} has successfully been registered. redirecting to index`);
                        res.redirect('https://lev-connect.herokuapp.com/');
                        // res.redirect('https://localhost:8000/#login');
                    }
                });
            }
        });
    });
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
