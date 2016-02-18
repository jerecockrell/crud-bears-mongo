var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

var bearRouter = require('./routes/bears');                                                                                                            

var Bear = require('./models/bear');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public')); 

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index')
});

app.get('/bears', function(req, res){
	Bear.find(function(err, bears){
		if(err){
		  console.log(err)
		} else {
		  res.render('bears', { bears: bears })
		}
	})
});

app.get('/about', function(req, res){
	var data = {};
	data.title = 'about page';
	data.name = 'Jere';
	data.time = new Date();
	res.render('about', data);
});

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next){
	console.log('something is happening!');
	next();
});

router.get('/', function(req, res) {
	res.json({ title : 'hooray it worked!!' });
});


app.use('/api', bearRouter);
app.listen(port, function(){
	console.log("app listening on port " + port)
})