const fs = require('fs');
const csv = require('fast-csv');
const { Client } = require('pg');
const client = new Client({
    user: "postgres",
    password: "Ajtibms12",
    port:5432,
    database: "lev-connect"
    });

// populate db;
client.connect();
fs.createReadStream('../email_list.csv')
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



