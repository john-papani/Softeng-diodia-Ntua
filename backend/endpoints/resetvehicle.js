const express = require('express')
const mysql = require('mysql');
const csvtojson = require('csvtojson');

var app = express()


const filename2 = 'vehicles.csv'
function resetvehicle(req, res) {
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
                let v_id = source[i]["vehicleID"]
                let t_id = source[i]["tagID"]
                let provider = source[i]["tagProvider"]
                let providerAb = source[i]["providerAbbr"]
                let year = source[i]["licenseYear"]

                connection.query('TRUNCATE TABLE vehicle', (err, results) => {
                    connection.query('INSERT INTO vehicle values (?,?,?,?,?)', [v_id, t_id, provider, providerAb, year], (err1, rows) => {
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

app.use('/admin/resetvehicles', resetvehicle)
module.exports = app
