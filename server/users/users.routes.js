`use strict`
const path = require('path');
import UserAuth from './controllers/users.auth';

// const UserAuth = usersRequire('controllers/users.auth.js');

module.exports = function (app) {
	// signup
	app.get('/signup',function(req,res){
		res.sendFile( path.join(__dirname, '../public/signup.html') );
	});

	app.post('/signup', function(req,res){
		res.setHeader('Content-Type', 'application/json');
		let userAuth = new UserAuth(req.body);
		userAuth.signup().then(function(){
			// console.log("success");
			res.status(200).send({"success": 1, message:"sign-up successfully"});			
		},function(){
			// console.log("failed");
			res.status(400).send({"success":0, "message":"sign-up failed"});
		});
	    // res.end(out);
	});

	// login
	app.get('/login', function(req,res){
		res.sendFile( path.join(__dirname, '../public/login.html') );
	});
	app.post('/login', function(req,res){
		res.setHeader('Content-Type', 'application/json');
		let userAuth = new UserAuth(req.body);

		userAuth.login().then(function(uid){
			res.status(200).send({"success":1,"message":"login successfully","uid":uid});
		},function(){
			res.status(400).send({"success":0,"message":"login failed"});			
		})

	});

};