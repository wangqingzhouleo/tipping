`use strict`
const sha256 = require('sha256');
import {jwtOptions} from '~/configure.js';
const jwt = require('jsonwebtoken');
import JwtDecode from '~/JWTDecode'
import User from '../../server/users/users.main';
let testcases = require('./testCases.js').testcases;



module.exports = function(server,should){
	let update_test = {};
	let tc = testcases.uppro;
	let login = testcases.login;
	let decode = new JwtDecode();


	update_test.run = function(){
		let uid  = 0;

		describe("update profile",function(){
			before(function(done){
			if (login[0][1].length != 64)
				login[0][1] = sha256(login[0][1]);
			const body = {"loginInditify":login[0][0],"password":login[0][1]};
			// this.test(body);
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
			});

			for (let i=0; i < tc.length; i++){ 
				tc[i].uid = uid;
				let token = jwt.sign(tc[i], jwtOptions.secretOrKey);
				it("case" + i,function(done){
					server.post("/updateProfile").send({token:token})
					.end(function(err,res){
						// console.log(res.body);
						res.status.should.equal(tc[i].expect);
						done();
					})
				})
			}
		})
	}

	return update_test;

}