const express = require('express')
const csvtojson = require('csvtojson');
const mysql = require('mysql');



const app = express()


const filename1 = 'passes.csv'

function resetpass(req, res) {
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
        csvtojson().fromFile(filename1).then(source => {

            for (var i = 0; i < source.length; i++) {
                let id = source[i]["passID"]
                let time = source[i]["timestamp"]
                let station = source[i]["stationRef"]
                let vehicle = source[i]["vehicleRef"]
                let money = source[i]["charge"]
                let h = source[i]["hn"]
                let po = source[i]["p"]

                connection.query('TRUNCATE TABLE passes', (err, results) => {
                    connection.query('INSERT INTO passes values (?,?,?,?,?,?,?)', [id, time, station, vehicle, money, h, po], (err1, rows) => {
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
        })

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
}

app.get('/admin/resetpasses', resetpass);
module.exports = app;

