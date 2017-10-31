const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const sql = require("mssql");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('log: Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});


// config for your database
var config = {
 user: 'henri', //update me
 password: 'Ch@brand!', //update me
 server: 'sql-henri-sandbox.database.windows.net', //update me //If local, replace by 'localhost\\MSSQLSERVER' 
 options: 
        {
           database: 'SQL-sandbox' //update me
           , encrypt: true
        }
 };
 

app.post('/webhook', (req, res) => {
     
     // connect to your database
     sql.connect(config, function (err) {

         if (err) console.log(err);

         // create Request object
         var request = new sql.Request();

        var query = "SELECT a.MON, a.current_status FROM 'internal_sales' a WHERE a.MON = '"+ req.MON +"';"
        
         // query to the database and get the data
         request.query(query, function (err, recordset) {
            
             if (err) console.log(err)

             // send data as a response
             console.log(recordset);
             res.sen(recordset);

         });
     });
});
