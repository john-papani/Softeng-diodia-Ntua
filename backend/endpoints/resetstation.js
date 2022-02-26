const express = require('express')
const mysql = require('mysql');
const csvtojson = require('csvtojson');




var app = express()


const filename2 = 'stations.csv'
function resetstation(req, res) {
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
        csvtojson().fromFile(filename2).then(source => {

            for (var i = 0; i < source.length; i++) {
                let id = source[i]["stationID"]
                let provider = source[i]["stationProvider"]
                let name = source[i]["stationName"]

                connection.query('TRUNCATE TABLE station', (err, results) => {
                    connection.query('INSERT INTO station values (?,?,?)', [id, provider, name], (err1, rows) => {
                        if (i == (source.length - 1))
                            connection.release()

                        if (err1 && err) {
                            let format1 = req.query.format
                            if (format1 == "csv")
                                res.setHeader("Content-Type", "text/csv");
                            else if (format1 == "json" || format1 == undefined)
                                res.setHeader("Content-Type", "application/json");
                            res.send(
                                {
                                    "status": 'failed'
                                })
                            console.log("Unable to insert item at row ", i + 1);
                            console.log(err1);
                        }

                    })

                })

            }
            console.log("All items stored into database successfully")
            let format1 = req.query.format
            if (format1 == "csv")
                res.setHeader("Content-Type", "text/csv");
            else if (format1 == "json" || format1 == undefined)
                res.setHeader("Content-Type", "application/json");
            res.send(
                {
                    "status": 'OK'
                })
        })
    })
}

app.use('/admin/resetstations', resetstation)
module.exports = app
