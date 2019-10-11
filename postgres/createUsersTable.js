const fs = require('fs');
const csv = require('fast-csv');


const { Client } = require('pg');
const client = new Client({
    user: "postgres",
    password: "Ajtibms12",
    port:5432,
    database: "lev-connect"
    });

let text = 'CREATE TABLE users(id SERIAL PRIMARY KEY, firstname VARCHAR(40) not null, lastname VARCHAR(40) not null, email VARCHAR(40) not null, password VARCHAR(40) not null)'

// create email table
client.connect();
 client.query(text, [], (err, res) => {
    console.log(err ? err.stack : res);
    client.end()
});
