`use strict`
import {sqlPara} from '~/configure.js';
const mysql = require('promise-mysql');
// var sql = requre('sql');
// sql.setDialect('mysql');
/*
	An MySqlModels base abstract class
	Shall not be instantiate

*/

class MySqlModel{
	constructor(){
		this.sqlPara = sqlPara;
	}

	query(sql,callback){
		console.log(sql);
		let connection;
		mysql.createConnection(this.sqlPara).then(function(con){
			connection = con;
		    return connection.query(sql);
		}).catch(function(err){
			// console.error(err);
			connection.end();
			return callback(false,err);
		})
		.then(function(res){
			callback(true,res);
			connection.end();
		}).catch(function(res){
			// console.error(res);
			connection.end();
			return callback(false,res);
			// throw res;
		});
	}
	insert(table, fields, values,callback){
		if (fields.length != values.length)
			return -1;
		let n = fields.length;
		let sql = "INSERT INTO `" + table + "` (";
		sql += "`" + fields[0] + "`";
		for (let i=1;i<n;i++)
			sql += ", `" + fields[i] + "`";
		sql += ') VALUES( "' + values[0] + '"';
		for (let i=1;i<n;i++)
			sql += ', "' + values[i].toString() + '"';
		sql += ');';
		
		this.query(sql,callback);
	}


}

export default MySqlModel;
