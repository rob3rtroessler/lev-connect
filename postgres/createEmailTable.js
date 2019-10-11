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
client.connect();
 client.query('CREATE TABLE email_list(id SERIAL PRIMARY KEY, email_address VARCHAR(40) not null)', [], (err, res) => {
    console.log(err ? err.stack : res);
    client.end()
});
