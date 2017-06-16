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
		let connection;
		mysql.createConnection(this.sqlPara).then(function(con){
			connection = con;
		    return connection.query(sql);
		})
		.then(res =>callback(true,res))
		.catch(res=>callback(false,res))
		.then(()=>connection.end());
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

	generateUpdateSql(table,fields,values,res, resvalue){
		if (fields.length != values.length)
			return -1;
		let n = fields.length;
		let sql = "UPDATE `" + table + "` SET " + "`";
		sql += fields[0] + "` = " + mysql.escape(values[0]);
		for (let i=1; i < n; i ++)
			sql += ", `" + fields[i] + "` = " + mysql.escape(values[i]);
		sql += " WHERE `" + res + "` = " + mysql.escape(resvalue);
		return sql;
	}


}

export default MySqlModel;
