`use strict`
import UserAuth from './controllers/users.auth';
import UserProfile from './controllers/user.profile.js';
import JwtDecode from '~/JWTDecode'

class User{
	constructor(body){
		this.profile = new UserProfile();
		this.auth = {};
		this.decode = new JwtDecode();
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
	getProfileByid(uid,res){
		this.profile.getParaFromUid(uid).then(function(out){
			res.status(200).json(out[0]);
		}, function(){
			res.status(400).json({"success":0, "message":"uid not found"});
		});
	}
	getProfileByName(uid,res){
		this.profile.getParaFromUid(uid).then(function(out){
			res.status(200).json(out[0]);
		}, function(){
			res.status(400).json({"success":0, "message":"uid not found"});
		});
	}
	getProfile(token,res){
		const decode = this.decode.extractPayload(token);
		if (!decode)
			return res.status(400).json({"success":0, "message":"token not valid"});
		const uid = decode.id;
		this.profile.getParaFromUid(uid).then(function(out){
			res.status(200).json({"success":1, "profile":out[0]});
		}, function(){
			res.status(400).json({"success":0, "message":"uid not found"});
		});
	}
	updateProfile(token,res){
		const decode = this.decode.extractPayload(token);
		if (!decode)
			return res.status(400).json({"success":0, "message":"token not valid"});

		decode.para.uid = decode.uid;
		this.profile.updateDetail(decode.para).then(function(out){
			res.status(200).json({"success":1, "message":"success"});
		}, function(){
			res.status(400).json({"success":0, "message":"uid not found"});
		});		
	}
}

export default User;