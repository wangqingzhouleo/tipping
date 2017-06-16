`use strict`
const sha256 = require('sha256');
import {jwtOptions} from '~/configure.js';
const jwt = require('jsonwebtoken');
import JwtDecode from '~/JWTDecode'
import User from '../../server/users/users.main';
let testcases = require('./testCases.js').testcases;




module.exports = function(server,should){
	let update_test = {};
	let decode = new JwtDecode();
	let tc = testcases.login;

	update_test.run = function(){
		let uid  = 0;
		let token = "";
		let index = -1;
		describe("get profile",function(){
			beforeEach(function(done){
				index ++;
				if (tc[index][2] != 200){
					uid = 0;
					done();
					return;
				}
				if (tc[index][1].length != 64)
					tc[index][1] = sha256(tc[index][1]);
				const body = {"loginInditify":tc[index][0],"password":tc[index][1]};
				// console.log(body);
				try{
					server.post("/login").send(body)
					.end(function(err,res){
						let payload = decode.extractPayload(res.body.token);
						uid = payload.uid;
						done();
					})
				}
				catch(e){
					console.log(e.message);
				}
			})

			for (let i=0; i < tc.length; i++){
				it("case" + i,function(done){
					let token = jwt.sign({uid:uid}, jwtOptions.secretOrKey);
					server.post("/profile").send({token:token})
					.end(function(err,res){
						if (uid!= 0)
							res.status.should.equal(200);
						else
							res.status.should.equal(400);
						done();
					})
				})
			}
		})
	}

	return update_test;

}