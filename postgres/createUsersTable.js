const fs = require('fs');
const csv = require('fast-csv');


const { Client } = require('pg');
const client = new Client({
    user: "postgres",
    password: "Ajtibms12",
    port:5432,
    database: "lev-connect"
    });

let text = 'CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(40) not null UNIQUE, password VARCHAR(80) not null)';
let registration = 'CREATE TABLE registration(id SERIAL PRIMARY KEY, email VARCHAR(40) not null UNIQUE, password VARCHAR(80) not null, token VARCHAR(80))';

// create email table
client.connect();
 client.query(text, [], (err, res) => {
    console.log(err ? err.stack : res);
    client.end()
});



