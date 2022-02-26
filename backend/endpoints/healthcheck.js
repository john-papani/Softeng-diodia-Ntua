const express = require('express')
const mysql = require('mysql');


var app = express()



function gethealthcheck(req, res) {
    var pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'softeng-21-63_db'
    });
    pool.getConnection((err, connection) => {
        if (err) {
            let format1 = req.query.format
            if (format1 == "csv")
                res.setHeader("Content-Type", "text/csv");
            else if (format1 == "json" || format1 == undefined)
                res.setHeader("Content-Type", "application/json");
            res.send(
                {
                    "status": "failed",
                    "dbconnection": " "
                })
        }
        else {
            let format1 = req.query.format
            if (format1 == "csv")
                res.setHeader("Content-Type", "text/csv");
            else if (format1 == "json" || format1 == undefined)
                res.setHeader("Content-Type", "application/json");
            res.send(
                {
                    "status": "OK",
                    "dbconnection": connection.threadId,

                })
            connection.release()
        }
    })
}
app.get('/admin/healthcheck', gethealthcheck)
module.exports = app
