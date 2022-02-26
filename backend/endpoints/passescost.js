const express = require('express')
const mysql = require('mysql');

var app = express()

function getpasscost(req, res) {
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
        connection.query('SELECT COUNT(passID) as num FROM passes WHERE (timestamp BETWEEN ? AND ? AND stationRef LIKE ? AND hn LIKE ?) ', [from, to, "%" + id1 + "%", id2], (err, passes1) => {
            connection.query('SELECT SUM(charge)  as sum FROM passes WHERE (timestamp BETWEEN ? AND ? AND stationRef LIKE ? AND hn LIKE ?) ', [from, to, "%" + id1 + "%", id2], (err1, cost1) => {
                //   connection.query('SELECT SUM(charge) as sum2 FROM passes WHERE (timestamp BETWEEN ? AND ? AND stationRef LIKE ? AND hn LIKE ?) ', [from, to, "%" + id2 + "%", id1], (err2, cost2) => {
                connection.release()
                // console.log(rows)
                console.log(passes1[0].num)
                console.log(cost1[0].sum)
                if (cost1[0].sum == null)
                    cost1[0].sum = 0
                if (!err) {
                    let format1 = req.query.format
                    if (format1 == "csv")
                        res.setHeader("Content-Type", "text/csv");
                    else if (format1 == "json" || format1 == undefined)
                        res.setHeader("Content-Type", "application/json");
                    res.send(
                        {
                            op1_ID: id1,
                            op2_ID: id2,
                            RequestTimestamp: toTimestamp(),
                            PeriodFrom: from,
                            PeriodTO: to,
                            NumberOfPasses: passes1[0].num,
                            PassesCost: cost1[0].sum,
                        }
                    )
                }
                else {
                    console.log(err)
                }
                //})
            })
        })
    })
}


function toDate(strDaTe) {
    var dateString = strDaTe;
    var year = dateString.substring(0, 4);
    var month = dateString.substring(4, 6);
    var day = dateString.substring(6, 8);

    var date = new Date(year, month, day);
    return date;
}

function toTimestamp() {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    var date1 = new Date(year, month - 1, date, hours, minutes, seconds);
    return date1
}

app.get('/PassesCost/:op1_ID/:op2_ID/:date_from/:date_to', getpasscost)
module.exports = app
