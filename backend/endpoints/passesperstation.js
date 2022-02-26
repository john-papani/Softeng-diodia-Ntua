const express = require('express')
const mysql = require('mysql');

var app = express()



function getpassesperstation(req, res) {
    var pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'softeng-21-63_db'
    });

    var id = req.params.stationID
    var from = req.params.date_from
    var to = req.params.date_to

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT COUNT(passID) as num FROM passes WHERE timestamp BETWEEN  ? AND  ?  AND stationRef LIKE ?', [from, to, '%' + id + '%'], (err, rows1) => {
            connection.query('SELECT * FROM passes WHERE timestamp BETWEEN  ? AND  ?  AND stationRef LIKE ? ORDER BY timestamp ASC', [from, to, '%' + id + '%'], (err, rows) => {
                connection.release()

                if (!err) {
                    let format1 = req.query.format
                    if (format1 == "csv")
                        res.setHeader("Content-Type", "text/csv");
                    else if (format1 == "json" || format1 == undefined)
                        res.setHeader("Content-Type", "application/json");
                    console.log('NUMBER OF PASSES: ', rows1)

                    res.send(
                        {
                            num: rows1[0].num,
                            list: rows
                        })
                }

                else {
                    console.log(err)
                }

            })
        })
    })
}
app.get('/PassesPerStation/:stationID/:date_from/:date_to', getpassesperstation);
module.exports = app;

