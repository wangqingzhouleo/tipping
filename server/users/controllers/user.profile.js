`use strict`
import MySqlModel from '~/MySqlModel';
class UserProfile{
	constructor(){
		this.isInit = false;
	}
	getParaFromUid(uid){
		const mySqlModel = new MySqlModel();
		const sql = "SELECT `*` FROM `users` WHERE  `uid` = "  + uid + " LIMIT 1;";
		var _this = this;
		return new Promise(function(resolve,reject){
			mySqlModel.query(sql,(success,out) =>{
				console.log(out);
				if (!success || out.length < 1)
					reject();
				else{
					resolve(out);
					_this.initWithDetail(out);
				}
			});
		});
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