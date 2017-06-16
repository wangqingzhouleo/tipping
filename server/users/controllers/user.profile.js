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
		const match = birthday.match(/^(\d{4})\-(\d{2})\-(\d{2})$/);
		if (!match || match.length !=4)
			return false;
		const year = parseInt(match[1]);
		const month = parseInt(match[2]);
		const day = parseInt(match[3]);
		const thisYear = new Date().getFullYear();
		if (year >= thisYear || year < thisYear - 200)
			return false;
		if (month > 12 || month < 0)
			return false;
		if (day > 31 || day <0)
			return false;
		if (month == 2){
			if (!(year%400==0 || (year%4==0 && year%100!=0)) && day > 28)
				return false;
		}
		else if ((month%2==0 && month <=7 || month%2==1 && month >7) && day > 30)
			return false;
		return true;
	}
	checkGender(sex){
		if (sex == "F" || sex == "M" || sex == "DK")
			return true;
		else
			return false;
	}
	updateDetail(detail){
		// console.log(detail);
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