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

    var id = req.params.op_ID
    var from = req.params.date_from
    var to = req.params.date_to
    var test = 'EG'
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT SUM(charge) as sumfirst,hn FROM passes WHERE timestamp BETWEEN ? AND ? AND stationRef LIKE ? AND p = "away" GROUP BY hn ', [from, to, "%" + id + "%"], (errfirst, sumfirst) => {
            connection.query('SELECT SUM(charge) as  sum0 ,hn FROM passes WHERE timestamp BETWEEN ? AND ? AND stationRef LIKE ? AND p = "away" AND hn = ? ', [from, to, "%" + sumfirst[0].hn + "%", id], (err0, sum0) => {
                connection.query('SELECT SUM(charge) as  sum1 ,hn FROM passes WHERE timestamp BETWEEN ? AND ? AND stationRef LIKE ? AND p = "away" AND hn  =? ', [from, to, "%" + sumfirst[1].hn + "%", id], (err1, sum1) => {
                    connection.query('SELECT SUM(charge) as  sum2 ,hn FROM passes WHERE timestamp BETWEEN ? AND ? AND stationRef LIKE ? AND p = "away" AND hn = ? ', [from, to, "%" + sumfirst[2].hn + "%", id], (err2, sum2) => {
                        connection.query('SELECT SUM(charge) as  sum3 ,hn FROM passes WHERE timestamp BETWEEN ? AND ? AND stationRef LIKE ? AND p = "away" AND hn = ? ', [from, to, "%" + sumfirst[3].hn + "%", id], (err3, sum3) => {
                            connection.query('SELECT SUM(charge) as  sum4 ,hn FROM passes WHERE timestamp BETWEEN ? AND ? AND stationRef LIKE ? AND p = "away" AND hn = ? ', [from, to, "%" + sumfirst[4].hn + "%", id], (err4, sum4) => {
                                connection.query('SELECT SUM(charge) as  sum5 ,hn FROM passes WHERE timestamp BETWEEN ? AND ? AND stationRef LIKE ? AND p = "away" AND hn = ? ', [from, to, "%" + sumfirst[5].hn + "%", id], (err5, sum5) => {

                                    connection.release()


                                    let v0, v1, v2, v3, v4, v5
                                    if (sumfirst[0].sumfirst > sum0[0].sum0)
                                        v0 = sumfirst[0].sumfirst - sum0[0].sum0
                                    else
                                        v0 = 0
                                    if (sumfirst[1].sumfirst > sum1[0].sum1)
                                        v1 = sumfirst[1].sumfirst - sum1[0].sum1
                                    else
                                        v1 = 0
                                    if (sumfirst[2].sumfirst > sum2[0].sum2)
                                        v2 = sumfirst[2].sumfirst - sum2[0].sum2
                                    else
                                        v2 = 0
                                    if (sumfirst[3].sumfirst > sum3[0].sum3)
                                        v3 = sumfirst[3].sumfirst - sum3[0].sum3
                                    else
                                        v3 = 0
                                    if (sumfirst[4].sumfirst > sum4[0].sum4)
                                        v4 = sumfirst[4].sumfirst - sum4[0].sum4
                                    else
                                        v4 = 0
                                    if (sumfirst[5].sumfirst > sum5[0].sum5)
                                        v5 = sumfirst[5].sumfirst - sum5[0].sum5
                                    else
                                        v5 = 0

                                    if (!err) {
                                        let format1 = req.query.format
                                        if (format1 == "csv")
                                            res.setHeader("Content-Type", "text/csv");
                                        else if (format1 == "json" || format1 == undefined)
                                            res.setHeader("Content-Type", "application/json");
                                        res.send
                                            ({
                                                OP_ID: id,
                                                requestTime: toTimestamp(),
                                                PERIOD_FROM: from,
                                                PERIOD_TO: to,
                                                op0: sumfirst[0].hn,
                                                value0: v0,
                                                op1: sumfirst[1].hn,
                                                value1: v1,
                                                op2: sumfirst[2].hn,
                                                value2: v2,
                                                op3: sumfirst[3].hn,
                                                value3: v3,
                                                op4: sumfirst[4].hn,
                                                value4: v4,
                                                op5: sumfirst[5].hn,
                                                value5: v5
                                            }
                                            )
                                    }
                                    else {
                                        console.log(err)
                                    }

                                })
                            })
                        })

                    })
                })
            })
        })
    })

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
app.get('/ChargesBy/:op_ID/:date_from/:date_to', getpasscost)
module.exports = app
