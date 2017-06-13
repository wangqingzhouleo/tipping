`use strict`
import UserAuth from './controllers/users.auth';
import UserProfile from './controllers/user.profile.js';

class User{
	constructor(body){
		this.profile = new UserProfile();
		this.auth = {};
		if (typeof body.sex != 'undefined') //pass in everthing
			this.profile = this.profile.initWithDetail(body);
		else	// pass in auth info
			this.auth = new UserAuth(body);
	}

	login(res){
		this.auth.login().then(function(object){
			res.status(200).json({message: "ok", token: object.token,"uid":object.uid});
		},function(){
			res.status(401).json({"success":0,"message":"login failed"});			
		});
	}
	signup(res){
		this.auth.signup().then(function(){
			res.status(200).json({"success": 1, message:"sign-up successfully"});			
		},function(){
			res.status(400).json({"success":0, "message":"sign-up failed"});
		});
	}
	getProfile(uid,res){
		this.profile.getParaFromUid(uid).then(function(out){
			res.status(200).json(out[0]);
		}, function(){
			res.status(400).json({"success":0, "message":"uid not found"});
		});
	}
}

export default User;