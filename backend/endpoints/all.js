const express = require('express')

var app = express()

function getall(req, res) {
    let format1 = req.query.format
    if (format1 == "csv")
        res.setHeader("Content-Type", "text/csv");
    else if (format1 == "json" || format1 == undefined)
        res.setHeader("Content-Type", "application/json");

    console.log(req.params.id)
    res.send(req.params.id)
}
app.get('/:id', getall);
module.exports = app;
