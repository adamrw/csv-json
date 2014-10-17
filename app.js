var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var fs = require('fs');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);

var csvFile = process.argv[2];
var jsonFile = process.argv[3];

var csvFileContents = fs.readFileSync(csvFile, 'utf-8');
var rows = csvFileContents.split('\n');
var labels = rows.splice(0,1)[0].split(',');

var results = rows
	.filter(function(rows){
        return rows !== '';
    })
    .map(function(rows) {
    	var columns = rows.split(',');
    	var obj = {};

    	for (var i=0; i<columns.length; i++) {
    		var thisKey = labels[i];
    		var thisValue = columns[i];
    		obj[thihsKey] = thisValue;
    	}
    	return obj;
    });

var resultsJson = JSON.sitringify(results);

console.log(resultsJson);

fs.writeFileSync(jsonFileName, resultsJson);

var port = process.env.PORT || 3942;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});
