`use strict`
const path = require('path');
const bodyParser = require("body-parser");
const passport = require("passport");
const fs = require('fs');
import User from './users.main';

module.exports = function (app) {
	app.use(passport.initialize());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	// parse application/json
	app.use(bodyParser.json());


	// signup
	app.get('/signup',function(req,res){
		res.sendFile( path.join(__dirname, '../../public/signup.html') );
	});

	app.post('/signup', function(req,res){
		let user = new User(req.body);
		user.signup(res);
	    // res.end(out);
	});

	// login
	app.get('/login', function(req,res){
		res.sendFile( path.join(__dirname, '../../public/login.html') );
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


	// password
	app.post('/forget',function(req,res){
		let user = new User(req,res);
		user.forgetPass(req.body.token,res);
	})
	app.get('/reset-password',function(req,res){
		let user = new User(req,res);
		const token = req.body.token || req.query.token;
		// console.log(token);
		user.resetPassCheck(token,(expired,email)=>{
			if (!expired){
		        return res.status(200).sendFile(path.join(__dirname, '../../public/reset-pass.html') );
			}
			else{
				console.log("fail");
		        return res.status(404).send("markup");
		    }
		});
	})
	app.post('/reset-password',function(req,res){
		let user = new User(req,res);
		user.resetPass(req.body,res)
	})
};