`use strict`

const path = require('path');


module.exports = function (app) {
	// signup
	app.get('/signup',function(req,res){
		res.sendFile( path.join(__dirname, '../public/signup.html') );
	});

	app.post('/signup', function(req,res){
		res.setHeader('Content-Type', 'application/json');
		let out = require('./users/controllers/users.auth.js')(req,res);
	    // res.end(out);
	});

	app.post('/clearall',function(req,res){
		let out = require('./dev/clearAll.js')(res);
	})
	// login
	app.get('/login', function(req,res){
		// res.sendFile( path.join(__dirname, '../public/login.html') );
	});
	app.post('/login', function(req,res){
		res.setHeader('Content-Type', 'application/json');
		require('./controllers/user/login.js')(req,res);
	});

	app.get('/', function (req, res) {
		res.send('Hello world');
	});
};