`use strict`
import UserAuth from '~/SqlUserAuth';
import MySqlModel from '~/MySqlModel';

class User {
	constructor(body){
		this.username = body.username;
		this.email = body.email;
		this.password = body.password;
		this.loginInditify = body.loginInditify;
		// this.body = body;
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


	signup(callback){
		// post
		let mySqlModel = new MySqlModel();
		let _this = this;
		return new Promise(function(resolve,reject){
			if (!_this.singupCheckInput())
				return reject();
			mySqlModel.insert("login",["username", "email","password"],
				[_this.username,_this.email,_this.password], (success,out) => {					
					if (success){
						console.log(success);
						resolve();
					}
					else
						reject();
			});
		}) 
	}

	login(){
		let mySqlModel = new MySqlModel();
		let field = this.loginInditify.includes("@")? "email" : "username";
		let sql = "SELECT `uid`, `password` FROM `login` WHERE `" +  field 
			+  "` = '" + this.loginInditify + "' LIMIT 1;";
		let _this = this;

		return new Promise(function (resolve,reject){
			// console.log(_this.loginCheckInput());	
			if (!_this.loginCheckInput()){
			 	return reject();
			}
			// post
			mySqlModel.query(sql,(success,out) =>{
				if (!success || out[0].password != _this.password){
					reject();
				}
				else
					resolve(out[0].uid);
			});			
		})

	}
}

export default User;