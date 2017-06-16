`use strict`
const path = require('path');
const bodyParser = require("body-parser");
const passport = require("passport");
import User from './users.main';


module.exports = function (app) {
	app.use(passport.initialize());
	// parse application/x-www-form-urlencoded
	// for easier testing with Postman or plain HTML forms
	app.use(bodyParser.urlencoded({
	  extended: true
	}));
	// parse application/json
	app.use(bodyParser.json());


	// signup
	app.get('/signup',function(req,res){
		res.sendFile( path.join(__dirname, '../public/signup.html') );
	});

	app.post('/signup', function(req,res){
		let user = new User(req.body);
		user.signup(res);
	    // res.end(out);
	});

	// login
	app.get('/login', function(req,res){
		res.sendFile( path.join(__dirname, '../public/login.html') );
	});
	app.post('/login', function(req,res){
		let user = new User(req.body);
		user.login(res);
	});

	// Profile
	app.post('/profile',function(req,res){
		let user = new User(req,res);
		user.getProfile(req.body.token,res);
	})

	app.post('/updateProfile',function(req,res){
		let user = new User(req,res);
		user.updateProfile(req.body.token,res);
	})
	// app.post('/profileById',function(req,res){
	// 	let user = new User(req,res);
	// 	user.getProfile(req.body.uid,res);
	// })
	// app.post('/profileByName',function(req,res){
	// 	let user = new User(req,res);
	// 	user.getProfile(req.body.uid,res);
	// })
};