var express = require('express')
var app = express()

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'habbittrack'
});
 
connection.connect();
 
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
 




app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/getHabbits', function (req, res) {
	console.log('test');
	connection.query('SELECT id,name FROM habbits WHERE is_active = 1;', function (error, results, fields) {
	  var data = {"Result":false,"Reason":'No data found.',"data":[]};
	  if (error){
	  	data['Reason'] = "Please try again.";
	  }else{
	  	data['Result'] = true;
	  	data['Reason'] = '';
	  	data['data'] = results;
	  }
	  res.setHeader('Content-Type', 'application/json');
	  res.send(JSON.stringify(data));
	});
	console.log('hi');
	/*connection.query( 'SELECT id,name FROM habbits WHERE is_active = 1', function(error, results, fields){
		if(error) console.log(error);
		console.log(reuslts);
	});
	connection.end();
	/*console.log(data);
    res.send(JSON.stringify(data));*/
})

app.post('/saveTrack', function(req, res){
	console.log(req.body);
	res.send('Thanks...')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
