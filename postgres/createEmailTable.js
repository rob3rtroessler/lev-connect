const fs = require('fs');
const csv = require('fast-csv');


const { Client } = require('pg');
const client = new Client({
    user: "vxvomjalsoktdz",
    password: "f70fabdaabde93ae33b33e031658714c9f6b02da1d7e9043554902b059460d5e",
    port:5432,
    database: "d4h6gl41uecc6l"
    });




// create email table
client.connect();
 client.query('CREATE TABLE email_list(id SERIAL PRIMARY KEY, email_address VARCHAR(40) not null)', [], (err, res) => {
    console.log(err ? err.stack : res);
    client.end()
});
