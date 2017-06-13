`use strict`
import MySqlModel from '~/MySqlModel';
import {jwtOptions} from '~/configure.js';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;


class UserAuth {
	saltedHashed(salt){
		const hash = crypto.createHash('sha256');		
		if ( typeof salt == "undefined")
			hash.update(this.password);
		else
			hash.update(this.password+salt);
		return hash.digest('hex');
	}

	singupCheckInput(){
		let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let match = this.email.match(pattern);
		let code = 0;
		if (match === null)// not match
			return false;
		else if (this.username.length < 1)
			return false;
		else if (this.username.length > 25)
			return false;
		else if (this.username.match(/^[a-zA-Z0-9_.-]*$/)===null)
			return false;
		else if (this.password.length !=64)
			return false;
		return true;
	}
	loginCheckInput(){
		let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let match = this.loginInditify.match(pattern);
		let code = 0;
		if (this.password.length !=64)
			return false;
		if (match === null){ // not email
			if (this.loginInditify.match(/^[a-zA-Z0-9_.-]*$/)===null)
				return false;
			else if (this.loginInditify.length > 25)
				return false;
		}
		return true;
	}
	constructor(body){
		this.username = body.username;
		this.email = body.email;
		this.password = body.password;
		this.loginInditify = body.loginInditify;
		// this.body = body;
	}
	signup(callback){
		// post
		const mySqlModel = new MySqlModel();
		const _this = this;
		const salt = crypto.randomBytes(32).toString('hex');

		return new Promise(function(resolve,reject){
			if (!_this.singupCheckInput())
				return reject();
			mySqlModel.insert("users",["username", "email","password","salt"],
				[_this.username,_this.email,_this.saltedHashed(salt),salt], (success,out) => {					
					if (success){
						resolve();
					}
					else
						reject();
			});
		}) 
	}
	login(){
		const mySqlModel = new MySqlModel();
		const field = this.loginInditify.includes("@")? "email" : "username";
		const sql = "SELECT `uid`, `password`, `salt` FROM `users` WHERE `" +  field 
			+  "` = '" + this.loginInditify + "' LIMIT 1;";
		const _this = this;

		return new Promise(function (resolve,reject){	
			if (!_this.loginCheckInput()){
			 	return reject();
			}
			// post
			mySqlModel.query(sql,(success,out) =>{
				if (!success || out[0].password != _this.saltedHashed(out[0].salt)){
					reject();
				}
				else{
					const payload = {"id":out[0].uid};
					const token = jwt.sign(payload, jwtOptions.secretOrKey);
					resolve({"token":token,"uid":out[0].uid});
					// resolve({token:token,uid:out[0].uid});
				}
			});	
		})		
	}
}

export default UserAuth;