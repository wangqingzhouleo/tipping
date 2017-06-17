`use strict`
import MySqlModel from '~/MySqlModel';
import Email from '~/email'
const jwt = require('jsonwebtoken');
import {jwtOptions} from '~/configure.js';
const mysql = require('promise-mysql');
const crypto = require('crypto');


class UserPass{
	saltedHashed(password,salt){
		const hash = crypto.createHash('sha256');		
		if ( typeof salt == "undefined")
			hash.update(password);
		else
			hash.update(password+salt);
		return hash.digest('hex');
	}
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
			const expire = Math.floor(+ new Date()/1000) + 15 * 60; // 15 minutes
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
		// console.log(sql);
		const now = Math.floor(+ new Date()/1000);
		this.mySqlModel.query(sql,(success,res)=>{
			// console.log(res[0]);
			if (success && res.length == 1 && now < res[0]['reset-pass-token-expired'])
				callback(false);
			else
				callback(true);
		})
	}
	updatePass(email,password,callback){
		if (password.length != 64)
			return callback(true);
		const sql = "SELECT `reset-pass-token-expired`, `salt` FROM `users` WHERE `email` = " 
			+ mysql.escape(email) + ";";
		const now = Math.floor(+ new Date()/1000);
		this.mySqlModel.query(sql,(success,res)=>{
			// console.log(res[0]);
			if (success && res.length == 1 && now < res[0]['reset-pass-token-expired']){				
				const updateSql = "UPDATE `users` SET `password` = '" + 
					this.saltedHashed(password,res[0].salt) + "', `reset-pass-token-expired` = 0 WHERE `email` = "
					+ mysql.escape(email) + ";";
				console.log(updateSql);
				this.mySqlModel.query(updateSql,()=>{});
				callback(false);
			}
			else
				callback(true);
		});

	}
}

export default UserPass;