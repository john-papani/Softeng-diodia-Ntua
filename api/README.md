# API SPECS

- base url: [http://localhost:8000/](http://localhost:8000)

- all the GET request use database and query
### Testing Endpoints
- GET `/:id` : return id value
- GET `/pass`: return all passes
- GET `/station`: return all stations
- GET `/vehicle`: return all vehicles

### Basic Endpoints
- GET `/PassesPerStation/:stationID/:date_from/:date_to` : return all passes from station with id = stationID for the period  _date_from_ to _date_to_

- GET `/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to` : return all passes from stations with id = op2_ID with tags from op1_ID for the period  _date_from_ to _date_to_

- GET `/PassesCost/:op1_ID/:op2_ID/:date_from/:date_to` : return number of passes and the total cost from stations with id = op2_ID with tags from op1_ID for the period  _date_from_ to _date_to_

- GET `/ChargesBy/:op_ID/:date_from/:date_to` : return number of passes and the total cost from stations with id = op_ID with tags from all other operators for the period  _date_from_ to _date_to_

###   Διαχειριστικά Endpoints 
- GET `/admin/healthcheck`: return _{"status":"OK",
"dbconnection":[connection string]}_ when database connection is on, otherwise _{"status":"failed","dbconnection":[connection string]}_ 

- GET `/admin/resetpasses` : return _{"status":"OK"}_ if delete all passes and store only samples data, otherwise _{"status":"failed"}_

- GET `/admin/resetstations` : return _{"status":"OK"}_ if delete all stations and store only samples data, otherwise _{"status":"failed"}_
- GET `/admin/resetvehicles` : return _{"status":"OK"}_ if delete all vehicles and store only samples data, otherwise _{"status":"failed"}_
