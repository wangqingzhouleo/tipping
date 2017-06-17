`use strict`
import MySqlModel from '~/MySqlModel';
import Email from '~/email'
const jwt = require('jsonwebtoken');
import {jwtOptions} from '~/configure.js';
const mysql = require('promise-mysql');


class UserPass{
	constructor(){
		this.mySqlModel = new MySqlModel();
		this.emailServer = new Email();
	}
	errorPromise(){
		return new Promise(function(resolve,reject){
			reject();
		})
	}
	getPromise(sql,obj){
		return new Promise(function(resolve,reject){
			obj.mySqlModel.query(sql,(success,out) =>{
				if (!success)
					reject();
				else{
					resolve(out);
				}
			});
		});		
	}
	checkEmail(email,callback){
		const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!email.match(pattern))
			callback(false);
		const sql = "SELECT `uid` FROM `users` WHERE `email` = " + mysql.escape(email) + " LIMIT 1;";
		this.mySqlModel.query(sql, (success,res)=>{
			if (success && res.length ==1)
				callback(true);
			else
				callback(false);
		})

	}
	forget(email,callback){
		this.checkEmail(email,check =>{

			if (!check){
				return callback({success:false});
			}
			// console.log()
			const expire = + new Date() + 15 * 60; // 15 minutes
			const token = jwt.sign({email:email,expire:expire},jwtOptions.secretOrKey);
			// updating database will be done later
			const sql = this.mySqlModel.generateUpdateSql(
					'users',["reset-pass-token-expired"],[expire],"email",email);
			this.mySqlModel.query(sql, (err,res)=>{});
			//
			callback({success:true,token:token});
		})		
	}
	isTokenExpired(email,callback){
		const sql = "SELECT `reset-pass-token-expired` FROM `users` WHERE `email` = " 
			+ mysql.escape(email) + ";";
		console.log(sql);
		const now = + new Date();
		this.mySqlModel.query(sql,(success,res)=>{
			console.log(res[0]);
			if (success && res.length == 1 && now < res[0]['reset-pass-token-expired'])
				callback(false);
			else
				callback(true);
		})
	}
}

export default UserPass;