const express = require('express')
const mysql = require('mysql');

var app = express()

function getpassesanalysis(req, res) {
    var pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'softeng-21-63_db'
    });

    var id1 = req.params.op1_ID
    var id2 = req.params.op2_ID
    var from = req.params.date_from
    var to = req.params.date_to

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT COUNT(passID) as num FROM passes  WHERE timestamp BETWEEN ? AND ? AND stationRef LIKE ? AND hn LIKE ? AND p = "away"', [from, to, "%" + id1 + "%", id2], (err, rows1) => {
            connection.query("SELECT * FROM passes WHERE timestamp BETWEEN ? AND ? AND stationRef LIKE ? AND hn LIKE ? AND p = 'away' ORDER BY timestamp ASC ", [from, to, "%" + id1 + "%", id2], (err, rows) => {
                connection.release()
                console.log(id1)
                if (!err) {
                    let format1 = req.query.format
                    if (format1 == "csv")
                        res.setHeader("Content-Type", "text/csv");
                    else if (format1 == "json" || format1 == undefined)
                        res.setHeader("Content-Type", "application/json");
                    // res.send(rows)

                    res.send(
                        {
                            num: rows1[0].num,
                            list: rows
                        }
                    )
                }
                else {
                    console.log(err)
                }

            })
        })
    })
}
app.get('/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to', getpassesanalysis)
module.exports = app
