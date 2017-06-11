`use strict`
import MySqlModel from "~/MySqlModel";

class UserAuth extends MySqlModel {
	constructor(userInfo){
		super();
		this.username = userInfo.username;
		this.email = userInfo.email;
		this.password = userInfo.pwd;
		this.userOrEmail = userInfo.userOrEmail;
	}
	signup(callback){
		super.insert("login",["username", "email","password"],
			[this.username,this.email,this.password],callback);
	}
	checkUsername(username,callback){
		let sql = "SELECT `uid` FROM `login` WHERE `username` = '" + username + "' LIMIT 1;";
		super.query(sql,function(res){
			if (res.success){
				callback(res[0].uid);
			}
			else{
				callback(-1);
			}
		});
	}
	checkEmail(callback){

	}
	ckeckPassword(callback){

	}
	login(callback){
		
	}
}

export default UserAuth;