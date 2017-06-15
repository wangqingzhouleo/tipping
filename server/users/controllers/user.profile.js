`use strict`
import MySqlModel from '~/MySqlModel';

class UserProfile{
	constructor(){
		this.isInit = false;
	}
	getParaPromise(sql,obj){
		const mySqlModel = new MySqlModel();
		return new Promise(function(resolve,reject){
			mySqlModel.query(sql,(success,out) =>{
				// console.log(out);
				if (!success || out.length < 1)
					reject();
				else{
					resolve(out);
					obj.initWithDetail(out);
				}
			});
		});		
	}
	getParaFromUid(uid){		
		const sql = "SELECT `*` FROM `users` WHERE  `uid` = "  + uid + " LIMIT 1;";
		return this.getParaPromise(sql,this);

	}
	getParaFromName(username){
		const sql = "SELECT `*` FROM `users` WHERE  `username` = '"  + username + "' LIMIT 1;";
		return this.getParaPromise(sql,this);
	}
	initWithDetail(detail){
		this.isInit = true;
		this.name = {"first":detail.firstname, "middle":detail.middlename,
					 "last":detail.lastname, "displayname":detail.displayname};
		this.identity = {"uid":detail.uid, "username":detail.username, "roles":detail.roles};
		this.phone = detail.phone;
		this.location = detail.location;
		this.birthday = detail.birthday;
		this.create_time = detail.creat_time;
		this.birthday = detail.birthday;
		this.sex = detail.sex;
		this.imgurl = detail.imgurl;
		this.update = detail.update;		
	}
	isEmpty(){
		return !this.isInit();
	}
	toJson(){

	}

}

export default UserProfile;