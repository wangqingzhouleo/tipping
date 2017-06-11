/*
	@fa93hws https://github.com/fa93hws
	Input para: 
*/

`use strict`
const sqlPara = require('../../configure.js').getSqlPara();
const mysql = require('mysql');


function sendQuery(body, sqlCon,callback){
	console.log(body);
	let sql = "INSERT INTO login (username, email,password) VALUES ('??', '??', '??')";
	sqlCon.query(sql,[body.username, body.email, body.pwd],function(err,result){
		console.log("queried");
		if (err)
			callback(err,{"code":1,"body":"Error inserting into mysql"});
		else
			callback(null,{"code":0,"body":"success"});
	});
	sqlCon.end();
}


module.exports=function(req,res){

	let user = req.body.username;
	let email = req.body.email;
	var out = {"code":-1, "body":""};
	// is a valid email
	let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let match = email.match(pattern);
	if (match === null){ // not match
		out.code = 3;
		out.body = email + " is not a valid email";
		return res.send(JSON.stringify(out));
	}
	if (user.length < 1){
		out.code = 4;
		out.body = "user name should not be empty";
		return res.send(JSON.stringify(out));
	}
	else if (user.length > 25){
		out.code = 5;
		out.body = "user name too long";
		return res.send(JSON.stringify(out));
	}
	pattern = /^[a-zA-Z0-9_.-]*$/;
	match = user.match(pattern);
	if (match===null){
		out.code = 2;
		out.body = "username should only contain letters, numbers '-' , '_' and '.'";
		return res.send(JSON.stringify(out));
	}

	let sqlCon = mysql.createConnection({
		host:sqlPara.host,
		user:sqlPara.user,
		password:sqlPara.pswd,
		database:sqlPara.db
	});
	sqlCon.connect();

	sendQuery(req.body,sqlCon,function(err,data){
		if(err) {
			console.error(err);
			res.send(JSON.stringify(data));
		}
		else
			res.send(JSON.stringify(data));
	});

}