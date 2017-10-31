const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const sql = require("mssql");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('log: Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});


// config for your database
var config = {
     user: 'henri', //update me
     password: 'Ch@brand!', //update me
     server: 'sql-henri-sandbox.database.windows.net', //update me 
     database: 'SQL-sandbox', //update me
     options:{encrypt: true}
 };
 

app.post('/webhook', (req, res) => {
     
     //get MON number from webhook call
     var MON = req.body.MON;
    
     // connect to your database
     sql.connect(config, function (err) {

         if (err) console.log(err);

         // create Request object
         var request = new sql.Request();
         
          // create the query that will return the order status from the MON number
         var query = "SELECT a.MON, a.current_status FROM [internal_sales] a WHERE a.MON = '"+ MON +"';"
        
         // query to the database and get the data
         request.query(query, function (err, recordset) {
            
             if (err) console.log(err)

             // send data as a response
             console.log(recordset);
             res.send(recordset);
             sql.close()
         });
     });
});
