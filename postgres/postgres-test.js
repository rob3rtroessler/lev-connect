const fs = require('fs');
const csv = require('fast-csv');


const { Client } = require('pg');
const client = new Client({
    user: "postgres",
    password: "Ajtibms12",
    port:5432,
    database: "lev-connect"
    });




// create email table
/*client.connect();
 client.query('CREATE TABLE email_list(id SERIAL PRIMARY KEY, email_address VARCHAR(40) not null)', [], (err, res) => {
    console.log(err ? err.stack : res);
    client.end()
});*/

// populate db;
/*
client.connect();
fs.createReadStream('email_list.csv')
    .pipe(csv.parse())
    .on('error', error => console.error(error))
    .on('data', function(row) {
        console.log(row[0]);
        client.query('insert into email_list(email_address) values ($1)', [row[0]], (err, res) => {
        console.log(err? err.stack : res);
        console.log('inserted');
        })

    })
    .on('end', rowCount => console.log(`done. inserted ${rowCount} rows`));

*/



// insert new user
/*client.query('insert into users(firstname, lastname, email, password) values($1, $2, $3, $4)', ['robert','roessler','mail','pw'], (err, res) => {
    console.log(err ? err.stack : res);
    client.end()
});*/


// insert emails;
/*listArray.forEach(function (d){

    client.query('insert into email_list(email_address) values ($1)', [d], (err, res) => {
        console.log(err? err.stack : res);
        console.log('inserted');
        })
    });*/


// select user;
client.connect();
client.query('SELECT * from email_list', [], (err, res) => {
    console.log(err ? err.stack : res.rows);
    client.end()
});



/*

client.connect()
    .then( ()=> console.log("connected successfully") )
//    .then( () => client.query('DROP TABLE public.usersTwo'))

    // drop
    // .then( () => client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, firstname VARCHAR(40) not null, lastname VARCHAR(40) not null, email VARCHAR(40) not null, password VARCHAR(40) not null)'))

    // insert
    //.then( () => client.query('insert into users(firstname, lastname, email, password) values(robert, roessler, robertroessler@g.harvard.edu,mytestpassword)') )
    .then( () => client.query('select * from public.users') )
    .then( (response) => { console.log(response) })
    .catch(e => console.log)
    .finally(() => {
        console.log('dropped');
        client.end()
    });
*/
