`use strict`
import UserAuth from './controllers/users.auth';
import UserProfile from './controllers/user.profile.js';
import UserPass from './controllers/user.password.js';
import JwtDecode from '~/JWTDecode'

class User{
	constructor(body){
		this.profile = new UserProfile();
		this.auth = {};
		this.decode = new JwtDecode();
		this.userPass = new UserPass();
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
		const uid = decode.uid;
		console.log(uid);
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

		this.profile.updateDetail(decode).then(function(out){
			res.status(200).json({"success":1, "message":"success"});
		}, function(){
			res.status(400).json({"success":0, "message":"error in fields"});
		});		
	}
	forgetPass(token,res){
		const decode = this.decode.extractPayload(token);
		if (!decode)
			return res.status(400).json({"success":0, "message":"token not valid"});
		this.userPass.forget(decode.email,out =>{
			if (out.success)
				if (devMode)
					res.status(200).json({success:1, message:"email sent if exists",url:out.token});
				else
					res.status(200).json({success:1, message:"email sent if exists"});
			else
				if (devMode)
					res.status(400).json({success:0, message:"error"});
				else				
					res.status(200).json({success:1, message:"email sent if exists"});			
		});
	}
	resetPassCheck(token,callback){
		const decode = this.decode.extractPayload(token);
		if (!decode)
			return callback(true);
		console.log(decode);
		this.userPass.isTokenExpired(decode.email,expired=>{
			callback(expired,decode.email);
		})
	}
}

export default User;