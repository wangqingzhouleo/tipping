`use strict`
import MySqlModel from '~/MySqlModel';
const mysql = require('promise-mysql');


class UserProfile{
	constructor(){
		this.isInit = false;
		this.displayField = ["uid","username","email","create_time","roles","sex","imageurl",
							"birthday","phone","location","displayname","updated"];
		this.selectDisplayFromUser = "SELECT " + "`" + this.displayField.join("`, `") + "`" + 
					" FROM `users` WHERE  ";
		this.mySqlModel = new MySqlModel();
	}
	errorPromise(){
		return new Promise(function(resolve,reject){
			reject();
		})
	}
	getPromise(sql,obj){
		return new Promise(function(resolve,reject){
			obj.mySqlModel.query(sql,(success,out) =>{
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
		const sql = this.selectDisplayFromUser + " `uid` = "  + mysql.escape(uid) + " LIMIT 1;";
		return this.getPromise(sql,this);

	}
	getParaFromName(username){
		const sql = this.selectDisplayFromUser +  " `username` = '"  + mysql.escape(username) + "' LIMIT 1;";
		return this.getPromise(sql,this);
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
	checkBirthday(birthday){
		return true;
	}
	checkGender(sex){
		if (sex == "F" || sex == "M" || sex == "DK")
			return true;
		else
			return false;
	}
	updateDetail(detail){
		if (!this.checkBirthday(detail.birthday) || !this.checkGender(detail.sex))
			return this.errorPromise();
		let fields = ["sex","imageurl","birthday","location","birthday","displayname"];
		let values = [];
		for (let i=0; i< fields.length;i++){
			values.push(detail[fields[i]]);
		}

		const sql = this.mySqlModel.generateUpdateSql("users",fields,values,"uid",detail.uid);
		return this.getPromise(sql,this);
	}
	isEmpty(){
		return !this.isInit();
	}
	toJson(){

	}

}

export default UserProfile;