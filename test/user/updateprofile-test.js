`use strict`
const sha256 = require('sha256');
import {jwtOptions} from '~/configure.js';
const jwt = require('jsonwebtoken');
import JwtDecode from '~/JWTDecode'
import User from './users.main';

const querystring = require('querystring');
const http = require('http');
const fs = require('fs');

module.exports = function(server,should){
	let update_test = {};
	let tc = testcases.uppro;
	
	let decode = new JwtDecode();
	update_test.update = function(token,i){
        server
        .post("/updateProfile")
        .send({"token":token})
        .end(function(err,res){
        	console.log("123");
        	console.log(res.body);
        	res.status.should.equal(tc[i].expect);

        });	
	}

	update_test.test = function(i){

	}
	update_test.loginPromise = function(){
		let user = new User(req.body);	
		let login = testcases.login;	
		return new Promise(function(resolve,reject){
			res = {"body":{"loginInditify":login[0][0],"password":login[0][1]}};
			user.login(res);
		})
	}


	update_test.run = function(){
		login[0][1] = sha256(login[0][1]);
		for (var i=0; i < 1; i++){
			this.test(i);
		}
	}

	return update_test;

}