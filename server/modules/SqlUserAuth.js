`use strict`
import MySqlModel from "~/MySqlModel";

class UserAuth extends MySqlModel {
	constructor(userInfo){
		super();
		this.username = userInfo.username;
		this.email = userInfo.email;
		this.password = userInfo.pwd;
		this.userOrEmail = userInfo.userOrEmail;
		this.out = {"code":0,"body":""};
	}
	errorMessage(){
		switch (this.out.code){
			case 0:
				this.out.body = "success";
				break;
			case 1:
				this.out.body = "Cannot insert into mysql";
				break;
			case 2:
				this.out.body = "username should only contain letters, numbers '-' , '_' and '.'";
				break;
			case 3:
				this.out.body = "not a valid email";
				break;
			case 4:
				this.out.body = "user name should not be empty";
				break;
			case 5:
				this.out.body = "user name is too long";
				break;
			default:
				this.out.body = "";
		}
		return this.out;
	}
	checkInput(){
		let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let match = this.email.match(pattern);
		if (match === null){ // not match
			this.out.code = 3;
		}
		else if (this.username.length < 1){
			this.out.code = 4;
		}
		else if (this.username.length > 25){
			this.out.code = 5;
		}
		else if (this.username.match(/^[a-zA-Z0-9_.-]*$/)===null){
			this.out.code = 2;
		}
		return this.errorMessage();
	}
	signup(callback){
		let check = this.checkInput();
		if (check.code != 0)
			return callback(check);
		super.insert("login",["username", "email","password"],
			[this.username,this.email,this.password],success => {
				if (success)
					this.out.code = 0;
				else
					this.out.code = 1;
				return callback(this.errorMessage());
			});

	}
}

export default UserAuth;