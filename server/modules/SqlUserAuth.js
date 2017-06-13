`use strict`
import MySqlModel from "~/MySqlModel";

class UserAuth extends MySqlModel {
	constructor(userInfo){
		super();
		this.username = userInfo.username;
		this.email = userInfo.email;
		this.password = userInfo.password;
		this.loginInditify = userInfo.loginInditify	;
	}
	login(callback){
		let userOrEmail = this.loginInditify;
		let field = userOrEmail.includes("@")? "email" : "username";


		let sql = "SELECT `uid`, `password` FROM `login` WHERE `" +  field 
			+  "` = '" + userOrEmail + "' LIMIT 1;";
		console.log(sql);
		super.query(sql,callback);
	}
}

export default UserAuth;