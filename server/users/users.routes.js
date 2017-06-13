`use strict`
const path = require('path');
import User from './users.main';


module.exports = function (app) {
	// signup
	app.get('/signup',function(req,res){
		res.sendFile( path.join(__dirname, '../public/signup.html') );
	});

	app.post('/signup', function(req,res){
		res.setHeader('Content-Type', 'application/json');
		let user = new User(req.body);
		user.signup(res);
	    // res.end(out);
	});

	// login
	app.get('/login', function(req,res){
		res.sendFile( path.join(__dirname, '../public/login.html') );
	});
	app.post('/login', function(req,res){
		res.setHeader('Content-Type', 'application/json');
		let user = new User(req.body);
		user.login(res);
	});
};