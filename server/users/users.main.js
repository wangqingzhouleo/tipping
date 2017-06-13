`use strict`
import Auth from './controllers/users.auth'

class User{
	constructor(body){
		this.auth = new Auth(body);
	}

	login(res){
		this.auth.login().then(function(uid){
			res.status(200).send({"success":1,"message":"login successfully","uid":uid});
		},function(){
			res.status(400).send({"success":0,"message":"login failed"});			
		})
	}
	signup(res){
		this.auth.signup().then(function(){
			res.status(200).send({"success": 1, message:"sign-up successfully"});			
		},function(){
			res.status(400).send({"success":0, "message":"sign-up failed"});
		});
	}

}

export default User;