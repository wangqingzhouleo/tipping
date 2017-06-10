`use strict`

const path = require('path');
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


module.exports = function (app) {
	// signup
	app.get('/signup',function(req,res){
		res.sendFile( path.join(__dirname, '../public/signup.html') );
	});

	app.post('/signup', function(req,res){
		res.setHeader('Content-Type', 'application/json');
		let out = require('./user/signup.js')(req,res);
	    // res.end(out);
	});

	app.post('/clearall',function(req,res){
		let out = require('./clearAll.js')(res);
	})
	// login
	app.get('/login', function(req,res){
		res.sendFile( path.join(__dirname, '../public/login.html') );
	});
	app.post('/login', function(req,res){
		res.send('Hello');
	});

	app.get('/', function (req, res) {
		res.send('Hello world');
	});

	app.get('./about', function (req, res){
		res.sedn('');
	})
	app.get('/customer', function(req, res){
		res.send('customer page');
	});

	app.get('/admin', function(req, res){
		res.send('admin page');
	});
};