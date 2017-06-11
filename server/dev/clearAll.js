`use strict`
const sqlPara = require('../configure.js').getSqlPara();
const mysql = require('mysql');



module.exports=function(req,res){
	let sqlCon = mysql.createConnection({
		host:sqlPara.host,
		user:sqlPara.user,
		password:sqlPara.pswd,
		database:sqlPara.db
	});

	// console.log(sqlPara);

	sqlCon.connect();
	sqlCon.query("DELETE FROM login WHERE uid < 999999999");
	sqlCon.end();
	res.send('deleted');
}