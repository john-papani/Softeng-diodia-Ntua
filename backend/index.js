
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');
const csvtojson = require('csvtojson');


const app = express()
const port = 8000;
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname));
});

app.listen(port, () => console.log(`Listen on port ${port}`))

var healthcheck1 = require('./endpoints/healthcheck.js')
//var resetpasses1 = require('./endpoints/resetpasses')
var resetstations1 = require('./endpoints/resetstation.js')
var resetvehicles1 = require('./endpoints/resetvehicle.js')



//main endpoints
var pass1 = require("./endpoints/pass.js")
var station1 = require("./endpoints/station.js")
var vehicle1 = require('./endpoints/vehicle.js')
var passesperstation1 = require("./endpoints/passesperstation.js")
var passesanalysis1 = require('./endpoints/passesanalysis.js')
var passescost1 = require('./endpoints/passescost.js')
var chargesby1 = require('./endpoints/chargesby.js')


//general 
var all1 = require('./endpoints/all.js')

//main endpoints
app.use('/', pass1)
app.use('/', station1)
app.use('/', vehicle1)
app.use('/', passesperstation1)
app.use('/', passesanalysis1)
app.use('/', passescost1)
app.use('/', chargesby1)

//general
app.use('/', all1)

app.use('/', healthcheck1)
app.use('/', resetstations1)
app.use('/', resetvehicles1)
//app.use('/', resetpasses1);
