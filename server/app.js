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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 




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
	var habbit_id = req.body.habbit_id;
	var isDone = req.body.is_done;
	var isActive = req.body.is_active;
	var comment = req.body.comment;
	var save = {"habbit_id": habbit_id, "is_done": isDone, "is_active": isActive, "comment": comment };
	var data = [];
	connection.query( 'INSERT INTO tracks( habbit_id,is_done,is_active,comment ) VALUES ?', save,function(error,result ){
		if( error ){
			data = {"Result":false, "Reason": 'Please try again.'};
		}else{
			data = {"Result":true, "Reason": 'Data save successfully.'};
		}
	})
	res.send('Thanks...')
})

app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})
