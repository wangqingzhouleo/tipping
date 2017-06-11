`use strict`
import UserAuth from '~/SqlUserAuth';


function errorMessage(code,mode){
	let out = {"code":code,"body":""};
	let signupMessage = ["success", "Cannot insert into mysql", //0 1
		"username should only contain letters, numbers '-' , '_' and '.'","not a valid email", // 2 3
		"user name should not be empty","user name is too long","email already existed", // 4 5 6
		"username already existed", "password not correctly hashed"]; // 7 8
	let loginMessage = [signupMessage[0], "user/email contains invalid char", signupMessage[8],// 0 1 2
		signupMessage[5], "user/email or password is wrong", "error posting the query" // 3 4 5
	];
	if(mode == "signup")
		out.body = signupMessage[code];
	else if (mode == "login")
		out.body = loginMessage[code];
	return out;
}

function singupCheckInput(email,username,password){
	let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let match = email.match(pattern);
	let code = 0;
	if (match === null)// not match
		code = 3;
	else if (username.length < 1)
		code = 4;
	else if (username.length > 25)
		code = 5;
	else if (username.match(/^[a-zA-Z0-9_.-]*$/)===null)
		code = 2;
	else if (password.length !=64)
		code = 8;
	return errorMessage(code);
}

function loginCheckInput(useremail,password){
	let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let match = useremail.match(pattern);
	let code = 0;
	if (password.length !=64)
		code = 2;
	if (match === null){ // not email
		if (useremail.match(/^[a-zA-Z0-9_.-]*$/)===null)
			code = 1;
		else if (useremail.length > 25)
			code = 3;
	}
	return errorMessage(code);
}

function loginErrorMessage(code){

}
exports.signup = function(req,res){
	let check = singupCheckInput(req.body.email, req.body.username,req.body.pwd);
	if (check.code !=0)
		return res.send(check);
	// post
	let mySqlModel = new UserAuth(req.body);
	mySqlModel.signup( out => {
		if (out.success)
			return res.send(errorMessage(0,"signup"));
		else{
			let errMsg = out.body.toString().substring(30,100);
			if (errMsg.indexOf("email_UNIQUE") > -1)
				return res.send(errorMessage(6,"signup"));
			else if (errMsg.includes("username_UNIQUE"))
				return res.send(errorMessage(7,"signup"));
			else
				return res.send(errorMessage(1,"signup"));
		}	
	});
}

exports.login = function(req,res){
	let check = loginCheckInput(req.body.loginInditify,req.body.pwd);
	if (check.code !=0)
		return res.send(check);
	// post
	console.log(req.body.loginInditify);
	let mySqlModel = new UserAuth(req.body);		
	mySqlModel.login( out =>{
		console.log(out.body[0].password);
		if (!out.sucess==false)
			return res.send(errorMessage(5,"login"));
		else if (out.body.length == 0 || out.body[0].password != req.body.pwd)
			return res.send(errorMessage(4,"login"));
		else
			return res.send({"code":0,"uid":out.body[0].uid}});
	});

}