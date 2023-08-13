// create web server

var express = require('express');
var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
		.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set port
app.set('port', process.env.PORT || 3000);

// static middleware
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('/contact', function(req, res) {
	res.render('contact', { csrf: 'CSRF token goes here' });
});

app.get('/thankyou', function(req, res) {
	res.render('thankyou');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next) {
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

// start web server
app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' +
			app.get('port') + '; press Ctrl-C to terminate.');
});