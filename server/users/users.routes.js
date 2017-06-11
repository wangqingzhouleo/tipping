`use strict`
const path = require('path');
const UserAuth = usersRequire('controllers/users.auth.js');

module.exports = function (app) {
	// signup
	app.get('/signup',function(req,res){
		res.sendFile( path.join(__dirname, '../public/signup.html') );
	});

	app.post('/signup', function(req,res){
		res.setHeader('Content-Type', 'application/json');
		UserAuth.signup(req,res);
	    // res.end(out);
	});

	// login
	app.get('/login', function(req,res){
		res.sendFile( path.join(__dirname, '../public/login.html') );
	});
	app.post('/login', function(req,res){
		res.setHeader('Content-Type', 'application/json');
		UserAuth.login(req,res);
	});

};