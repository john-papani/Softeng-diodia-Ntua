const express = require('express')
const mysql = require('mysql');


var app = express()



function getallpass(req, res) {
    var pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'softeng-21-63_db'
    });

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from passes', (err, rows) => {
            connection.release()
            console.log(rows)
            if (!err) {
                let format1 = req.query.format
                if (format1 == "csv")
                    res.setHeader("Content-Type", "text/csv");
                else if (format1 == "json" || format1 == undefined)
                    res.setHeader("Content-Type", "application/json");
                res.send(rows)
            }
            else {
                console.log(err)
            }

        })
    })
}
app.get('/pass', getallpass);
module.exports = app;
