`use strict`
import UserAuth from '~/SqlUserAuth';


function errorMessage(code){
	let out = {"code":code,"body":""};
	switch (code){
		case 0:
			out.body = "success";
			break;
		case 1:
			out.body = "Cannot insert into mysql";
			break;
		case 2:
			out.body = "username should only contain letters, numbers '-' , '_' and '.'";
			break;
		case 3:
			out.body = "not a valid email";
			break;
		case 4:
			out.body = "user name should not be empty";
			break;
		case 5:
			out.body = "user name is too long";
			break;
		case 6:
			out.body = "email already existed";
			break;
		case 7:
			out.body = "username already existed";
			break;
		case 8:
			out.body = "password not correctly hashed";
		default:
			out.body = "";
	}
	return out;
}

function checkInput(email,username,password){
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

exports.signup = function(req,res){
	console.log(req.body.pwd);
	let check = checkInput(req.body.email, req.body.username,req.body.pwd);
	if (check.code !=0)
		return res.send(check);
	let mySqlModel = new UserAuth(req.body);
	mySqlModel.signup( out => {
		if (out.success)
			return res.send(errorMessage(0));
		else{
			let errMsg = out.body.toString().substring(30,100);
			if (errMsg.indexOf("email_UNIQUE") > -1)
				return res.send(errorMessage(6));
			else if (errMsg.includes("username_UNIQUE"))
				return res.send(errorMessage(7));
			else
				return res.send(errorMessage(1));	
		}	
	});
}

exports.login = function(req,res){
	let mySqlModel = new UserAuth(req.body);
	mySqlModel.login(message => {
		res.send(message);
	})
}